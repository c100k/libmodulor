export class CustomError extends Error {
    static ERROR_UNKNOWN = 'An unexpected error occurred';
    constructor(message) {
        super(message ?? CustomError.ERROR_UNKNOWN);
        this.name = 'CustomError';
        Object.setPrototypeOf(this, CustomError.prototype);
    }
    toObj() {
        return {
            message: this.message,
        };
    }
}
