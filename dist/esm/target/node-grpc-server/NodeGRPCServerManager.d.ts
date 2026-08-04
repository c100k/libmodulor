import type { Server } from '@grpc/grpc-js';
import type { AppManifest } from '../../app/index.js';
import type { DirPath, URLPath } from '../../dt/index.js';
import type { ProductUCsLoaderOutput } from '../../product/index.js';
import type { Configurable, Logger, SettingsManager } from '../../std/index.js';
import type { UCDef, UCInput, UCManager, UCOPIBase, UCTransportContract } from '../../uc/index.js';
import type { OpenAPISpec } from '../lib/openapi/types.js';
import { EntrypointsBuilder } from '../lib/server/EntrypointsBuilder.js';
import type { ServerManager } from '../lib/server/ServerManager.js';
import { ServerCredentialsCreator } from '../lib/server-grpc/ServerCredentialsCreator.js';
import { ServiceManager } from '../lib/server-grpc/ServiceManager.js';
import type { ListenSettings, StopSettings } from '../lib/server-node/types.js';
type S = ListenSettings & StopSettings;
/**
 * This server must not be used in production.
 * It's not fully safe.
 *
 * @alpha
 */
export declare class NodeGRPCServerManager implements Configurable<S>, ServerManager {
    private entrypointsBuilder;
    private serverCredentialsCreator;
    private logger;
    private settingsManager;
    private ucManager;
    private serviceManager;
    protected server: Server;
    constructor(entrypointsBuilder: EntrypointsBuilder, serverCredentialsCreator: ServerCredentialsCreator, logger: Logger, settingsManager: SettingsManager<S>, ucManager: UCManager, serviceManager: ServiceManager);
    s(): S;
    overrideUCManager(ucManager: UCManager): void;
    init(): Promise<void>;
    initSync(): void;
    mount<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined>(appManifest: AppManifest, ucd: UCDef<I, OPI0, OPI1>, contract: UCTransportContract): Promise<void>;
    mountSync<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined>(appManifest: AppManifest, ucd: UCDef<I, OPI0, OPI1>, contract: UCTransportContract): void;
    mountMCP(_ucs: ProductUCsLoaderOutput, _at: URLPath): Promise<void>;
    mountOpenAPISpec(_spec: OpenAPISpec, _at: URLPath): Promise<void>;
    mountStaticDir(_dirPath: DirPath): Promise<void>;
    start(): Promise<void>;
    stop(): Promise<void>;
    warmUp(): Promise<void>;
    private mountCommon;
}
export {};
