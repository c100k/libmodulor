import type { RequestHandler } from 'express';
import type { MCPHTTPExpressRequestHandlerBuilder } from './types.js';
export declare class MCPHTTPExpressFakeRequestHandlerBuilder implements MCPHTTPExpressRequestHandlerBuilder {
    exec(): RequestHandler;
}
