import type { Hono } from 'hono';
import type { AppManifest } from '../../app/index.js';
import type { DirPath } from '../../dt/index.js';
import type { Configurable, SettingsManager } from '../../std/index.js';
import type { UCDataStore, UCDef, UCHTTPContract, UCInput, UCManager, UCOPIBase } from '../../uc/index.js';
import type { ServerManager } from '../lib/server/ServerManager.js';
import { ServerRequestHandler } from '../lib/server/ServerRequestHandler.js';
export interface SyncEdgeWorkerHonoServerManagerSettings {
    sewhsm_bindings_uc_data_store: string | null;
}
type S = SyncEdgeWorkerHonoServerManagerSettings;
export declare class SyncEdgeWorkerHonoServerManager implements Configurable<S>, ServerManager {
    private serverRequestHandler;
    private settingsManager;
    private ucDataStore;
    private ucManager;
    protected runtime: Hono;
    constructor(serverRequestHandler: ServerRequestHandler, settingsManager: SettingsManager<S>, ucDataStore: UCDataStore, ucManager: UCManager);
    s(): SyncEdgeWorkerHonoServerManagerSettings;
    getRuntime(): Hono;
    overrideUCManager(ucManager: UCManager): void;
    init(): Promise<void>;
    initSync(): void;
    mount<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined>(_appManifest: AppManifest, _ucd: UCDef<I, OPI0, OPI1>, _contract: UCHTTPContract): Promise<void>;
    mountSync<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined>(appManifest: AppManifest, ucd: UCDef<I, OPI0, OPI1>, contract: UCHTTPContract): void;
    mountStaticDir(_dirPath: DirPath): Promise<void>;
    start(): Promise<void>;
    stop(): Promise<void>;
    warmUp(): Promise<void>;
    private beforeExec;
}
export {};
