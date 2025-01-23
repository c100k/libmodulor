import { CustomError } from './CustomError.js';
export class ForbiddenAsNotFoundError extends CustomError {
    httpStatus = 404;
    constructor(message) {
        super(message ?? 'Not found');
        this.name = 'ForbiddenAsNotFoundError';
        Object.setPrototypeOf(this, ForbiddenAsNotFoundError.prototype);
    }
}
