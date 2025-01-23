import type { ErrorRequestHandler } from 'express';
import type { Worker } from '../../../std/index.js';
import { CustomerFacingErrorBuilder } from '../../lib/server/CustomerFacingErrorBuilder.js';
interface Input {
}
type Output = ErrorRequestHandler;
export declare class ErrorMiddlewareBuilder implements Worker<Input, Output> {
    private customerFacingErrorBuilder;
    constructor(customerFacingErrorBuilder: CustomerFacingErrorBuilder);
    exec(_input: Input): Output;
}
export {};
