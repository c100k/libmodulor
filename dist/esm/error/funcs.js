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
export function throwCustomError(message, status) {
    const clazz = ERROR_HTTP_STATUS_MAP.get(status);
    if (clazz) {
        throw new clazz(message);
    }
    throw new InternalServerError(message);
}
