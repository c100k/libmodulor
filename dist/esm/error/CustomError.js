export class CustomError extends Error {
    static UNEXPECTED = 'err_unexpected';
    constructor(message) {
        super(message ?? CustomError.UNEXPECTED);
        this.name = 'CustomError';
        Object.setPrototypeOf(this, CustomError.prototype);
    }
    toObj() {
        return {
            message: this.message,
        };
    }
}
