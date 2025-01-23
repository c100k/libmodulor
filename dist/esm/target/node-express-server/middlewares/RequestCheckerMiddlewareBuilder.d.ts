import type { RequestHandler } from 'express';
import type { Worker } from '../../../std/index.js';
import { RequestChecker } from '../../lib/server/RequestChecker.js';
interface Input {
}
type Output = RequestHandler;
export declare class RequestCheckerMiddlewareBuilder implements Worker<Input, Output> {
    private requestChecker;
    constructor(requestChecker: RequestChecker);
    exec(_input: Input): Output;
}
export {};
