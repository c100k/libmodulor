import { type Express } from 'express';
import type { AppManifest } from '../../app/index.js';
import type { DirPath } from '../../dt/index.js';
import type { Configurable, EnvironmentManager, Logger, LoggerSettings, SettingsManager } from '../../std/index.js';
import type { UCDef, UCHTTPContract, UCInput, UCManager, UCOPIBase } from '../../uc/index.js';
import { EntrypointsBuilder } from '../lib/server/EntrypointsBuilder.js';
import type { ServerManager, ServerManagerSettings } from '../lib/server/ServerManager.js';
import { ServerRequestHandler } from '../lib/server/ServerRequestHandler.js';
import { ServerSSLCertLoader } from '../lib/server/ServerSSLCertLoader.js';
import { HelmetMiddlewareBuilder } from './middlewares/HelmetMiddlewareBuilder.js';
type S = Pick<LoggerSettings, 'logger_level'> & Pick<ServerManagerSettings, 'server_binding_host' | 'server_binding_port' | 'server_tmp_path'>;
export declare class NodeExpressServerManager implements Configurable<S>, ServerManager {
    private entrypointsBuilder;
    protected environmentManager: EnvironmentManager;
    private helmetMB;
    protected logger: Logger;
    private serverRequestHandler;
    private serverSSLCertLoader;
    private settingsManager;
    private ucManager;
    protected runtime: Express;
    private server;
    constructor(entrypointsBuilder: EntrypointsBuilder, environmentManager: EnvironmentManager, helmetMB: HelmetMiddlewareBuilder, logger: Logger, serverRequestHandler: ServerRequestHandler, serverSSLCertLoader: ServerSSLCertLoader, settingsManager: SettingsManager<S>, ucManager: UCManager);
    s(): S;
    getRuntime(): Express;
    overrideUCManager(ucManager: UCManager): void;
    init(): Promise<void>;
    mount<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined>(appManifest: AppManifest, ucd: UCDef<I, OPI0, OPI1>, contract: UCHTTPContract): Promise<void>;
    mountStaticDir(dirPath: DirPath): Promise<void>;
    start(): Promise<void>;
    stop(): Promise<void>;
    warmUp(): Promise<void>;
    private createServer;
    private toFile;
    private toReq;
    private toRes;
}
export {};
