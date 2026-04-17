import { CustomError } from './CustomError.js';
export class NotFoundError extends CustomError {
    httpStatus = 404;
    constructor(message) {
        super(message ?? 'err_not_found');
        this.name = 'NotFoundError';
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}
