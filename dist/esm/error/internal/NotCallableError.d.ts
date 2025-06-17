export type NotCallableErrorReason = 'async-only';
export declare class NotCallableError<T> extends Error {
    constructor(calledFn: keyof T, callableFn: keyof T, reason: NotCallableErrorReason);
}
