export class NotAvailableError extends Error {
    constructor(calledFn) {
        super(`Method ${calledFn.toString()} is not available`);
        this.name = 'NotAvailableError';
        Object.setPrototypeOf(this, NotAvailableError.prototype);
    }
}
