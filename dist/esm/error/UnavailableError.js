import { CustomError } from './CustomError.js';
export class UnavailableError extends CustomError {
    httpStatus = 503;
    constructor(message) {
        super(message ?? 'err_unavailable');
        this.name = 'UnavailableError';
        Object.setPrototypeOf(this, UnavailableError.prototype);
    }
}
