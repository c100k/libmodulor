import type { RequestListener } from 'node:http';
import { WordingManager } from '../../../../../i18n/index.js';
import type { ProductManifest } from '../../../../../product/index.js';
import type { Logger } from '../../../../../std/index.js';
import { MCPServerRequestChecker } from '../../MCPServerRequestChecker.js';
import { MCPServerRequestHandler } from '../../MCPServerRequestHandler.js';
import type { MCPHTTPRequestHandlerBuilderInput } from '../MCPHTTPRequestHandlerBuilder.js';
import type { MCPHTTPNodeCoreRequestHandlerBuilder } from './types.js';
export declare class MCPHTTPNodeCoreProtocolRequestHandlerBuilder implements MCPHTTPNodeCoreRequestHandlerBuilder {
    private logger;
    private productManifest;
    private serverRequestChecker;
    private serverRequestHandler;
    private wordingManager;
    constructor(logger: Logger, productManifest: ProductManifest, serverRequestChecker: MCPServerRequestChecker, serverRequestHandler: MCPServerRequestHandler, wordingManager: WordingManager);
    exec({ ucs, ucManager, }: MCPHTTPRequestHandlerBuilderInput): RequestListener;
}
