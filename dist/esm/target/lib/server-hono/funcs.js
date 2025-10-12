import { Hono } from 'hono';
import { deleteCookie, getCookie, setCookie } from 'hono/cookie';
import { logger } from 'hono/logger';
import { secureHeaders } from 'hono/secure-headers';
import { NotFoundError } from '../../../error/index.js';
import { fromFormData, SSE_HEADERS, streamOPI } from '../../../utils/index.js';
export function buildHandler(appManifest, ucd, contract, serverRequestHandler, ucManager, beforeExec) {
    const { envelope } = contract;
    const handler = async (c) => {
        await beforeExec?.(c);
        const { body, status } = await serverRequestHandler.exec({
            appManifest,
            envelope,
            req: toReq(c),
            res: toRes(c),
            ucd,
            ucManager,
        });
        if (!body) {
            return c.newResponse(null, status);
        }
        const transportType = ucd.ext?.http?.transportType ?? 'standard';
        switch (transportType) {
            case 'standard':
                return c.json(body, status);
            case 'stream': {
                const stream = new ReadableStream({
                    start: (controller) => {
                        const cleanUpFunc = streamOPI(body.parts._0, (data) => controller.enqueue(data), 
                        // () => controller.close(), // It seems already closed
                        () => { });
                        if (!cleanUpFunc) {
                            controller.close();
                        }
                        c.req.raw.signal.addEventListener('abort', () => {
                            cleanUpFunc?.();
                            controller.close();
                        });
                    },
                });
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
        bodyFromQueryParams: async () => c.req.queries(),
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
