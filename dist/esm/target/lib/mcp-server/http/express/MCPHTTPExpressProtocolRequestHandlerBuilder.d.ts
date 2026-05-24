import type { RequestHandler } from 'express';
import { WordingManager } from '../../../../../i18n/index.js';
import type { ProductManifest } from '../../../../../product/index.js';
import type { Logger } from '../../../../../std/index.js';
import { MCPServerRequestHandler } from '../../MCPServerRequestHandler.js';
import type { MCPHTTPRequestHandlerBuilderInput } from '../MCPHTTPRequestHandlerBuilder.js';
import type { MCPHTTPExpressRequestHandlerBuilder } from './types.js';
export declare class MCPHTTPExpressProtocolRequestHandlerBuilder implements MCPHTTPExpressRequestHandlerBuilder {
    private logger;
    private productManifest;
    private serverRequestHandler;
    private wordingManager;
    constructor(logger: Logger, productManifest: ProductManifest, serverRequestHandler: MCPServerRequestHandler, wordingManager: WordingManager);
    exec({ ucs, ucManager, }: MCPHTTPRequestHandlerBuilderInput): RequestHandler;
}
