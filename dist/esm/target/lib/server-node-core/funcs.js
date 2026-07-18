import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { CustomError } from '../../../error/index.js';
import { defaultStreamOnClose, fmtSingleDataMsg, fmtSSEError, isError, SSE_HEADERS, } from '../../../utils/index.js';
import { DEFAULT_RES_HEADERS } from './consts.js';
export function assertIncomingMessageEnhanced(req) {
    if (!('bodyRaw' in req)) {
        throw new Error('IncomingMessage not enhanced');
    }
}
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
                let streamedOnce = false;
                execOpts = {
                    stream: {
                        onClose: defaultStreamOnClose(streamedOnce),
                        onData: async (output) => {
                            streamedOnce = true;
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
            res.writeHead(status, DEFAULT_RES_HEADERS).end();
            return;
        }
        switch (transportType) {
            case 'standard':
                res.writeHead(status, DEFAULT_RES_HEADERS).end(buildRes(body));
                return;
            case 'stream': {
                if (isError(status)) {
                    res.end(fmtSSEError({
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
export function buildRes(res) {
    if (res instanceof CustomError) {
        return JSON.stringify(res.toObj());
    }
    if (typeof res === 'string') {
        return res;
    }
    return JSON.stringify(res);
}
export async function enhanceIncomingMessage(req) {
    const chunks = [];
    for await (const chunk of req) {
        chunks.push(Buffer.from(chunk));
    }
    req.bodyRaw =
        Buffer.concat(chunks).toString('utf-8');
    // @ts-expect-error : not typed correctly (the field is present only when https, but https doesn't expose a dedicated IncomingRequest)
    const secure = req.socket.encrypted !== undefined;
    const protocol = secure ? 'https' : 'http';
    req.fullURL = new URL(`${protocol}://${req.headers.host ?? 'localhost'}${req.url}`);
    req.secure = secure;
}
export function init() {
    // TODO : Setup some middlewares if possible
}
export function mountHandler(contract, router, handler) {
    const { method, path, pathAliases } = contract;
    const keys = routeKeys(method, [path, ...pathAliases]);
    for (const routeKey of keys) {
        router[routeKey] = handler;
    }
}
export async function mountStaticDir(dirPath, router) {
    // This is obviously very hacky.
    // TODO : Improve static dir mounting
    const publicFiles = await readPublicFiles(dirPath);
    for (const f of publicFiles) {
        const handler = async (_req, res) => {
            let contentType = 'text/html';
            if (f.endsWith('.js')) {
                contentType = 'text/javascript';
            }
            else if (f.endsWith('.png')) {
                contentType = 'image/png';
            }
            res.writeHead(200, {
                ...DEFAULT_RES_HEADERS,
                'Content-Type': contentType,
            }).end(await readFile(f));
        };
        const path = f.replace(dirPath, '');
        router[`GET_${path}`] = handler;
        if (path === '/index.html') {
            router['GET_/'] = handler;
        }
    }
}
export function routeKey(method, path) {
    return `${method}_${path}`;
}
export function routeKeys(method, paths) {
    return paths.map((p) => routeKey(method, p));
}
export function toReq(req) {
    const cookies = readCookies(req);
    return {
        bodyFromFormData: async () => readFormData(req),
        bodyFromJSON: async () => (req.bodyRaw ? JSON.parse(req.bodyRaw) : {}),
        bodyFromQueryParams: async () => readQueryParams(req),
        bodyRaw: req.bodyRaw ?? null,
        cookie: async (name) => cookies[name],
        header: async (name) => {
            const h = req.headers[name.toLowerCase()];
            if (Array.isArray(h)) {
                return h[0];
            }
            return h;
        },
        method: req.method,
        secure: req.secure ?? false,
        url: req.fullURL?.toString(),
    };
}
export function toRes(res) {
    return {
        clearCookie: async (name) => {
            res.appendHeader('Set-Cookie', `${name}=; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Strict`);
        },
        redirect: async (location) => {
            res.writeHead(302, {
                Location: location,
            }).end();
        },
        setCookie: async ({ name, opts, val }) => {
            res.appendHeader('Set-Cookie', serializeCookie(name, val, opts));
        },
    };
}
function readCookies(req) {
    const header = req.headers.cookie;
    const cookies = {};
    if (!header) {
        return cookies;
    }
    for (const cookie of header.split(';')) {
        const [name, ...rest] = cookie.trim().split('=');
        if (!name) {
            continue;
        }
        cookies[name] = decodeURIComponent(rest.join('='));
    }
    return cookies;
}
async function readFormData(req) {
    const { bodyRaw } = req;
    if (!bodyRaw) {
        return {};
    }
    const type = req.headers['content-type'] ?? '';
    const boundary = `--${type.split('boundary=')[1]}`;
    const result = {};
    for (const part of bodyRaw.split(boundary).slice(1, -1)) {
        const [head, value] = part.split('\r\n\r\n');
        if (!head || !value) {
            continue;
        }
        let name = head.match(/name="([^"]+)"/)?.[1];
        if (!name) {
            continue;
        }
        const multiple = name.endsWith('[]');
        if (multiple) {
            name = name.slice(0, -2);
        }
        const filename = head.match(/filename="([^"]*)"/)?.[1];
        const data = filename
            ? {
                name: filename,
                size: Buffer.byteLength(value.slice(0, -2), 'binary'),
                type: head.match(/Content-Type:\s*(.+)/)?.[1] ??
                    'application/octet-stream',
                uri: filename,
            }
            : value.slice(0, -2);
        if (multiple) {
            if (Array.isArray(result[name])) {
                result[name].push(data);
            }
            else {
                result[name] = [data];
            }
        }
        else {
            result[name] = data;
        }
    }
    return result;
}
async function readPublicFiles(dirPath) {
    const entries = await readdir(dirPath, {
        withFileTypes: true,
    });
    const files = await Promise.all(entries.map((entry) => {
        const fullPath = join(dirPath, entry.name);
        return entry.isDirectory() ? readPublicFiles(fullPath) : fullPath;
    }));
    return files.flat();
}
function readQueryParams(req) {
    if (!req.fullURL) {
        return {};
    }
    return Object.fromEntries(req.fullURL.searchParams.entries());
}
function serializeCookie(name, value, options) {
    let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
    if (options.expires) {
        cookie += `; Expires=${options.expires.toUTCString()}`;
    }
    if (options.httpOnly) {
        cookie += '; HttpOnly';
    }
    if (options.secure) {
        cookie += '; Secure';
    }
    if (options.sameSite) {
        cookie += `; SameSite=${options.sameSite}`;
    }
    return cookie;
}
