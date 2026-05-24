import type { MiddlewareHandler } from 'hono';
import type { MCPHTTPHonoRequestHandlerBuilder } from './types.js';
export declare class MCPHTTPHonoFakeRequestHandlerBuilder implements MCPHTTPHonoRequestHandlerBuilder {
    exec(): MiddlewareHandler;
}
