import type { MiddlewareHandler } from 'hono';
import type { MCPHTTPRequestHandlerBuilder } from '../MCPHTTPRequestHandlerBuilder.js';
export type MCPHTTPHonoRequestHandlerBuilder = MCPHTTPRequestHandlerBuilder<MiddlewareHandler>;
