import cookieParser from 'cookie-parser';
import express, {} from 'express';
import fileUpload from 'express-fileupload';
import { fmtSingleDataMsg, fmtSSEError, isError, SSE_HEADERS, } from '../../../utils/index.js';
export function buildHandler(appManifest, ucd, contract, serverRequestHandler, ucManager) {
    const { envelope } = contract;
    const handler = async (req, res) => {
        const transportType = ucd.ext?.http?.transportType ?? 'standard';
        let execOpts;
        switch (transportType) {
            case 'standard':
                // Nothing to do
                break;
            case 'stream': {
                execOpts = {
                    stream: {
                        onClose: async () => {
                            throw new Error('execOpts.stream.onClose needs to be set in the UC ServerMain');
                        },
                        onData: async (output) => {
                            if (!output) {
                                return;
                            }
                            res.write(fmtSingleDataMsg(output));
                        },
                        onDone: async () => {
                            res.end();
                        },
                    },
                };
                for (const [k, v] of SSE_HEADERS) {
                    res.setHeader(k, v);
                }
                res.flushHeaders();
                res.on('close', async () => {
                    await execOpts?.stream?.onClose();
                });
                break;
            }
            default:
                transportType;
        }
        const { body, status } = await serverRequestHandler.exec({
            appManifest,
            envelope,
            execOpts,
            req: toReq(req),
            res: toRes(res),
            ucd,
            ucManager,
        });
        if (!body) {
            res.status(status).send();
            return;
        }
        switch (transportType) {
            case 'standard':
                res.status(status).send(body);
                return;
            case 'stream': {
                if (isError(status)) {
                    res.write(fmtSSEError({
                        message: body.message,
                        status,
                    }));
                }
                return;
            }
            default:
                transportType;
        }
    };
    return handler;
}
export function init(helmetMB, loggerLevel, serverTmpPath) {
    const app = express();
    app.use(helmetMB.exec({}));
    app.use(fileUpload({
        createParentPath: true,
        debug: loggerLevel === 'trace',
        tempFileDir: serverTmpPath,
        useTempFiles: true,
    }));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    return app;
}
export function mountHandler(contract, express, handler) {
    const { method, path, pathAliases } = contract;
    const httpMethod = method.toLowerCase();
    express[httpMethod](path, handler);
    for (const pathAlias of pathAliases) {
        express[httpMethod](pathAlias, handler);
    }
}
export function toFile(f) {
    return {
        name: f.name,
        path: f.tempFilePath,
        type: f.mimetype,
    };
}
export function toReq(req) {
    return {
        bodyFromFormData: async () => {
            // Since express v5, if the request contains only a file, `req.body` is `undefined`, hence the fallback on `{}`
            const input = req.body ?? {};
            // files is present when using express-fileupload
            if ('files' in req && req.files) {
                for (const [field, value] of Object.entries(req.files)) {
                    input[field] = Array.isArray(value)
                        ? value.map(toFile)
                        : toFile(value);
                }
            }
            for (const [k, v] of Object.entries(input)) {
                const isMultiple = k.endsWith('[]'); // e.g. 'tags[]': 'Electronic'
                const key = isMultiple ? k.replaceAll('[]', '') : k;
                if (isMultiple) {
                    input[key] = Array.isArray(v) ? v : [v];
                }
                else {
                    input[key] = v;
                }
            }
            return input;
        },
        bodyFromJSON: async () => req.body,
        bodyFromQueryParams: async () => req.query,
        bodyRaw: req.body,
        cookie: (name) => req.cookies[name],
        header: async (name) => {
            const h = req.headers[name.toLowerCase()];
            if (Array.isArray(h)) {
                return h[0];
            }
            return h;
        },
        method: req.method,
        secure: req.secure,
        url: req.url,
    };
}
export function toRes(res) {
    return {
        clearCookie: async (name) => {
            res.clearCookie(name);
        },
        redirect: async (location) => res.redirect(location),
        setCookie: async ({ name, opts, val }) => {
            res.cookie(name, val, opts);
        },
    };
}
