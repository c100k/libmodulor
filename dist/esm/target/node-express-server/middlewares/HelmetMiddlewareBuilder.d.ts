import type { RequestHandler } from 'express';
import type { Worker } from '../../../std/index.js';
import { CSPDirectivesBuilder } from '../../lib/server/CSPDirectivesBuilder.js';
interface Input {
}
type Output = RequestHandler;
export declare class HelmetMiddlewareBuilder implements Worker<Input, Output> {
    private cspDirectivesBuilder;
    constructor(cspDirectivesBuilder: CSPDirectivesBuilder);
    exec(_input: Input): Output;
}
export {};
