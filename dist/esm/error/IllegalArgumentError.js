import { CustomError } from './CustomError.js';
export class IllegalArgumentError extends CustomError {
    httpStatus = 400;
    constructor(message) {
        super(message ?? 'Bad request');
        this.name = 'IllegalArgumentError';
        Object.setPrototypeOf(this, IllegalArgumentError.prototype);
    }
}
