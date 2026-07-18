import type { RequestListener } from 'node:http';
import type { AppManifest } from '../../app/manifest.js';
import type { DirPath, URLPath } from '../../dt/index.js';
import type { ProductUCsLoaderOutput } from '../../product/index.js';
import type { Configurable, EnvironmentManager, Logger, LoggerSettings, SettingsManager } from '../../std/index.js';
import type { UCDef, UCHTTPContract, UCInput, UCManager, UCOPIBase } from '../../uc/index.js';
import type { MCPHTTPRequestHandlerBuilder } from '../lib/mcp-server/http/MCPHTTPRequestHandlerBuilder.js';
import type { OpenAPISpec } from '../lib/openapi/types.js';
import { CustomerFacingErrorBuilder } from '../lib/server/CustomerFacingErrorBuilder.js';
import { EntrypointsBuilder } from '../lib/server/EntrypointsBuilder.js';
import type { ServerManager, ServerManagerSettings } from '../lib/server/ServerManager.js';
import { ServerRequestHandler } from '../lib/server/ServerRequestHandler.js';
import { NodeHTTPServerCreator } from '../lib/server-node/NodeHTTPServerCreator.js';
import type { ListenSettings, Server, StopSettings } from '../lib/server-node/types.js';
type S = ListenSettings & Pick<LoggerSettings, 'logger_level'> & Pick<ServerManagerSettings, 'server_tmp_path'> & StopSettings;
/**
 * This server must not be used in production.
 * It's not fully safe.
 *
 * @alpha
 */
export declare class NodeCoreHTTPServerManager implements Configurable<S>, ServerManager {
    private customerFacingErrorBuilder;
    private entrypointsBuilder;
    protected environmentManager: EnvironmentManager;
    protected logger: Logger;
    private mcpHTTPRequestHandlerBuilder;
    private nodeHTTPServerCreator;
    private serverRequestHandler;
    private settingsManager;
    private ucManager;
    private runtime;
    private router;
    constructor(customerFacingErrorBuilder: CustomerFacingErrorBuilder, entrypointsBuilder: EntrypointsBuilder, environmentManager: EnvironmentManager, logger: Logger, mcpHTTPRequestHandlerBuilder: MCPHTTPRequestHandlerBuilder<RequestListener>, nodeHTTPServerCreator: NodeHTTPServerCreator, serverRequestHandler: ServerRequestHandler, settingsManager: SettingsManager<S>, ucManager: UCManager);
    s(): S;
    getRuntime(): Server;
    overrideUCManager(ucManager: UCManager): void;
    init(): Promise<void>;
    initSync(): void;
    mount<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined>(appManifest: AppManifest, ucd: UCDef<I, OPI0, OPI1>, contract: UCHTTPContract): Promise<void>;
    mountSync<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined>(appManifest: AppManifest, ucd: UCDef<I, OPI0, OPI1>, contract: UCHTTPContract): void;
    mountMCP(ucs: ProductUCsLoaderOutput, at: URLPath): Promise<void>;
    mountOpenAPISpec(spec: OpenAPISpec, at: URLPath): Promise<void>;
    mountStaticDir(dirPath: DirPath): Promise<void>;
    start(): Promise<void>;
    stop(): Promise<void>;
    warmUp(): Promise<void>;
    private mainListener;
    private mountCommon;
}
export {};
