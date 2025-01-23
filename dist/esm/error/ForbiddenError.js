import { CustomError } from './CustomError.js';
export class ForbiddenError extends CustomError {
    httpStatus = 403;
    constructor(message) {
        super(message ?? 'Forbidden');
        this.name = 'ForbiddenError';
        Object.setPrototypeOf(this, ForbiddenError.prototype);
    }
}
