import { CustomError } from './CustomError.js';
export class InternalServerError extends CustomError {
    httpStatus = 500;
    constructor(message) {
        super(message);
        this.name = 'InternalServerError';
        Object.setPrototypeOf(this, InternalServerError.prototype);
    }
}
