import { CustomError } from './CustomError.js';
export class ForbiddenError extends CustomError {
    httpStatus = 403;
    constructor(message) {
        super(message ?? 'err_forbidden');
        this.name = 'ForbiddenError';
        Object.setPrototypeOf(this, ForbiddenError.prototype);
    }
}
