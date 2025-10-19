import { Hono } from 'hono';
import { deleteCookie, getCookie, setCookie } from 'hono/cookie';
import { logger } from 'hono/logger';
import { secureHeaders } from 'hono/secure-headers';
import { NotFoundError } from '../../../error/index.js';
import { fmtSingleDataMsg, fmtSSEError, fromFormData, isError, SSE_HEADERS, } from '../../../utils/index.js';
export function buildHandler(appManifest, ucd, contract, serverRequestHandler, ucManager, beforeExec) {
    const { envelope } = contract;
    const handler = async (c) => {
        await beforeExec?.(c);
        const transportType = ucd.ext?.http?.transportType ?? 'standard';
        let execOpts;
        let stream;
        let controller;
        switch (transportType) {
            case 'standard':
                // Nothing to do
                break;
            case 'stream': {
                stream = new ReadableStream({
                    start: (ctrl) => {
                        controller = ctrl;
                        let closed = false;
                        const close = () => {
                            if (closed) {
                                return;
                            }
                            ctrl.close();
                            closed = true;
                        };
                        execOpts = {
                            stream: {
                                onClose: async () => { },
                                onData: async (output) => {
                                    if (!output || closed) {
                                        return;
                                    }
                                    ctrl.enqueue(fmtSingleDataMsg(output));
                                },
                                onDone: async () => {
                                    close();
                                },
                            },
                        };
                        c.req.raw.signal.addEventListener('abort', async () => {
                            close();
                            await execOpts?.stream?.onClose();
                        });
                    },
                });
                break;
            }
            default:
                ((_) => { })(transportType);
        }
        const { body, status } = await serverRequestHandler.exec({
            appManifest,
            envelope,
            execOpts,
            req: toReq(c),
            res: toRes(c),
            ucd,
            ucManager,
        });
        if (!body) {
            return c.newResponse(null, status);
        }
        switch (transportType) {
            case 'standard':
                return c.json(body, status);
            case 'stream': {
                if (isError(status)) {
                    controller?.enqueue(fmtSSEError({
                        message: body.message,
                        status,
                    }));
                }
                return new Response(stream, {
                    headers: SSE_HEADERS,
                });
            }
            default:
                ((_) => { })(transportType);
        }
        return c.json(body, status);
    };
    return handler;
}
export function init() {
    const app = new Hono();
    app.use(secureHeaders());
    app.use(logger());
    app.notFound((c) => {
        const err = new NotFoundError();
        return c.json(err.toObj(), err.httpStatus);
    });
    return app;
}
export function mountHandler(contract, hono, handler) {
    const { method, path, pathAliases } = contract;
    const httpMethod = method.toLowerCase();
    if (httpMethod === 'connect' ||
        httpMethod === 'head' ||
        httpMethod === 'trace') {
        throw new Error(`Unsupported HTTP method : ${httpMethod}`);
    }
    hono[httpMethod](path, handler);
    for (const pathAlias of pathAliases) {
        hono[httpMethod](pathAlias, handler);
    }
}
export function toReq(c) {
    return {
        bodyFromFormData: async () => fromFormData(await c.req.formData()),
        bodyFromJSON: () => c.req.json(),
        bodyFromQueryParams: async () => c.req.query(),
        bodyRaw: c.req.raw,
        cookie: async (name) => getCookie(c, name),
        header: async (name) => c.req.header(name),
        method: c.req.method,
        secure: c.req.url.startsWith('https://'),
        url: c.req.url,
    };
}
export function toRes(c) {
    return {
        clearCookie: async (name) => {
            deleteCookie(c, name);
        },
        redirect: async (location) => {
            c.redirect(location);
        },
        setCookie: async ({ name, opts, val }) => setCookie(c, name, val, opts),
    };
}
