import { CustomError } from './CustomError.js';
export class UnauthorizedError extends CustomError {
    httpStatus = 401;
    constructor(message) {
        super(message ?? 'Invalid credentials');
        this.name = 'UnauthorizedError';
        Object.setPrototypeOf(this, UnauthorizedError.prototype);
    }
}
