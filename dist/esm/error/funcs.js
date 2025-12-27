import { ForbiddenError } from './ForbiddenError.js';
import { IllegalArgumentError } from './IllegalArgumentError.js';
import { InternalServerError } from './InternalServerError.js';
import { NotFoundError } from './NotFoundError.js';
import { UnauthorizedError } from './UnauthorizedError.js';
const ERROR_HTTP_STATUS_MAP = new Map([
    [400, IllegalArgumentError],
    [401, UnauthorizedError],
    [403, ForbiddenError],
    [404, NotFoundError],
    [500, InternalServerError],
]);
export function isEmptyJSON(err) {
    return (err instanceof Error &&
        err.message.toLowerCase().includes('unexpected end of json input'));
}
export function isInvalidJSON(err) {
    if (!(err instanceof Error)) {
        return false;
    }
    const message = err.message.toLowerCase();
    // The usual JS error thrown by JSON.parse
    if (message.includes('is not valid json')) {
        return true;
    }
    // The error thrown by undici (used by hono for example)
    // https://github.com/nodejs/undici/blob/ec4a84e13a9b86355b4d65a63a247524986386af/lib/web/fetch/body.js#L402
    if (message.includes('content-type was not one of')) {
        return true;
    }
    return false;
}
export function throwCustomError(message, status) {
    const clazz = ERROR_HTTP_STATUS_MAP.get(status);
    if (clazz) {
        throw new clazz(message);
    }
    throw new InternalServerError(message);
}
