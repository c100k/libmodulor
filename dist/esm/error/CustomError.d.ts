import type { ErrorMessage, HTTPStatusNumber } from '../dt/index.js';
export interface ServerError {
    message: ErrorMessage;
}
export declare abstract class CustomError extends Error {
    static readonly ERROR_UNKNOWN: ErrorMessage;
    abstract httpStatus: HTTPStatusNumber;
    constructor(message?: ErrorMessage);
    toObj(): ServerError;
}
