import type { ErrorMessage, HTTPStatusNumber } from '../dt/index.js';
import { CustomError } from './CustomError.js';
export declare class IllegalArgumentError extends CustomError {
    httpStatus: HTTPStatusNumber;
    constructor(message?: ErrorMessage);
}
