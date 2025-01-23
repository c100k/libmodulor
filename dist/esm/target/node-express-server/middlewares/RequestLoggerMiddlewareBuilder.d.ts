import type { RequestHandler } from 'express';
import type { Logger, Worker } from '../../../std/index.js';
import { RequestLogger } from '../../lib/server/RequestLogger.js';
interface Input {
}
type Output = RequestHandler;
export declare class RequestLoggerMiddlewareBuilder implements Worker<Input, Output> {
    private logger;
    private requestLogger;
    constructor(logger: Logger, requestLogger: RequestLogger);
    exec(_input: Input): Output;
}
export {};
