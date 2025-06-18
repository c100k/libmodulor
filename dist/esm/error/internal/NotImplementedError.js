export class NotImplementedError extends Error {
    constructor(calledFn) {
        super(`Method ${calledFn.toString()} is not implemented yet`);
        this.name = 'NotImplementedError';
        Object.setPrototypeOf(this, NotImplementedError.prototype);
    }
}
