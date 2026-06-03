import type { MiddlewareHandler } from 'hono';
import { WordingManager } from '../../../../../i18n/index.js';
import type { ProductManifest } from '../../../../../product/index.js';
import type { Logger } from '../../../../../std/index.js';
import { MCPServerRequestChecker } from '../../MCPServerRequestChecker.js';
import { MCPServerRequestHandler } from '../../MCPServerRequestHandler.js';
import type { MCPHTTPRequestHandlerBuilderInput } from '../MCPHTTPRequestHandlerBuilder.js';
import type { MCPHTTPHonoRequestHandlerBuilder } from './types.js';
export declare class MCPHTTPHonoProtocolRequestHandlerBuilder implements MCPHTTPHonoRequestHandlerBuilder {
    private logger;
    private productManifest;
    private serverRequestChecker;
    private serverRequestHandler;
    private wordingManager;
    constructor(logger: Logger, productManifest: ProductManifest, serverRequestChecker: MCPServerRequestChecker, serverRequestHandler: MCPServerRequestHandler, wordingManager: WordingManager);
    exec({ ucs, ucManager, }: MCPHTTPRequestHandlerBuilderInput): MiddlewareHandler;
}
