import type { Hono } from 'hono';
import type { AppManifest } from '../../app/index.js';
import type { DirPath, URLPath } from '../../dt/index.js';
import type { ProductUCsLoaderOutput } from '../../product/index.js';
import type { Configurable, SettingsManager } from '../../std/index.js';
import type { UCDataStore, UCDef, UCInput, UCManager, UCOPIBase, UCTransportContract } from '../../uc/index.js';
import type { OpenAPISpec } from '../lib/openapi/types.js';
import { CustomerFacingErrorBuilder } from '../lib/server/CustomerFacingErrorBuilder.js';
import type { ServerManager } from '../lib/server/ServerManager.js';
import { ServerRequestHandler } from '../lib/server/ServerRequestHandler.js';
import { CORSMiddlewareBuilder } from '../lib/server-hono/CORSMiddlewareBuilder.js';
export interface SyncEdgeWorkerHonoServerManagerSettings {
    sewhsm_bindings_uc_data_store: string | null;
}
type S = SyncEdgeWorkerHonoServerManagerSettings;
export declare class SyncEdgeWorkerHonoServerManager implements Configurable<S>, ServerManager {
    private corsMiddlewareBuilder;
    private customerFacingErrorBuilder;
    private serverRequestHandler;
    private settingsManager;
    private ucDataStore;
    private ucManager;
    protected hono: Hono;
    constructor(corsMiddlewareBuilder: CORSMiddlewareBuilder, customerFacingErrorBuilder: CustomerFacingErrorBuilder, serverRequestHandler: ServerRequestHandler, settingsManager: SettingsManager<S>, ucDataStore: UCDataStore, ucManager: UCManager);
    s(): SyncEdgeWorkerHonoServerManagerSettings;
    overrideUCManager(ucManager: UCManager): void;
    init(): Promise<void>;
    initSync(): void;
    mount<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined>(_appManifest: AppManifest, _ucd: UCDef<I, OPI0, OPI1>, _contract: UCTransportContract): Promise<void>;
    mountSync<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined>(appManifest: AppManifest, ucd: UCDef<I, OPI0, OPI1>, contract: UCTransportContract): void;
    mountMCP(_ucs: ProductUCsLoaderOutput, _at: URLPath): Promise<void>;
    mountOpenAPISpec(_spec: OpenAPISpec, _at: URLPath): Promise<void>;
    mountStaticDir(_dirPath: DirPath): Promise<void>;
    start(): Promise<void>;
    stop(): Promise<void>;
    warmUp(): Promise<void>;
    private beforeExec;
}
export {};
