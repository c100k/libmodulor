export declare class NotAvailableError<T> extends Error {
    constructor(calledFn: keyof T);
}
