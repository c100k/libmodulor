import type { RequestListener } from 'node:http';
import type { MCPHTTPNodeCoreRequestHandlerBuilder } from './types.js';
export declare class MCPHTTPNodeCoreFakeRequestHandlerBuilder implements MCPHTTPNodeCoreRequestHandlerBuilder {
    exec(): RequestListener;
}
