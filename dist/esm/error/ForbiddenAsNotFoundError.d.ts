import type { ErrorMessage, HTTPStatusNumber } from '../dt/index.js';
import { CustomError } from './CustomError.js';
export declare class ForbiddenAsNotFoundError extends CustomError {
    httpStatus: HTTPStatusNumber;
    constructor(message?: ErrorMessage);
}
