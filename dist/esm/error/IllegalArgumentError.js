import { CustomError } from './CustomError.js';
export class IllegalArgumentError extends CustomError {
    httpStatus = 400; // 422 instead ?
    constructor(message) {
        super(message ?? 'err_illegal_argument');
        this.name = 'IllegalArgumentError';
        Object.setPrototypeOf(this, IllegalArgumentError.prototype);
    }
}
