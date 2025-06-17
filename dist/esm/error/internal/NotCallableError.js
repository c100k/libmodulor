export class NotCallableError extends Error {
    constructor(calledFn, callableFn, reason) {
        super(`Do not call ${calledFn.toString()}(). Call ${callableFn.toString()}() instead (reason : ${reason})`);
        this.name = 'NotCallableError';
        Object.setPrototypeOf(this, NotCallableError.prototype);
    }
}
