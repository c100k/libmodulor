import { CustomError } from './CustomError.js';
export class InternalServerError extends CustomError {
    httpStatus = 500;
    constructor(message) {
        super(message ?? CustomError.ERROR_UNKNOWN);
        this.name = 'InternalServerError';
        Object.setPrototypeOf(this, InternalServerError.prototype);
    }
}
