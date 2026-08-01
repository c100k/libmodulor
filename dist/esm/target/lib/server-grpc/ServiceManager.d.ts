import type { Server } from '@grpc/grpc-js';
import type { AppManifest } from '../../../app/index.js';
import type { Configurable, FSManager, Logger, SettingsManager } from '../../../std/index.js';
import type { UCDef, UCHTTPContract, UCInput, UCManager, UCOPIBase } from '../../../uc/index.js';
import type { ServerManagerSettings } from '../server/ServerManager.js';
import { ServerRequestHandler } from './ServerRequestHandler.js';
import type { GRPCServerManagerSettings } from './settings.js';
type S = Pick<ServerManagerSettings, 'server_tmp_path'> & Pick<GRPCServerManagerSettings, 'server_grpc_expose_reflection'>;
export declare class ServiceManager implements Configurable<S> {
    private fsManager;
    private logger;
    private serverRequestHandler;
    private settingsManager;
    private root;
    private services;
    constructor(fsManager: FSManager, logger: Logger, serverRequestHandler: ServerRequestHandler, settingsManager: SettingsManager<S>);
    s(): S;
    addServices(server: Server): Promise<void>;
    exposeReflection(server: Server): Promise<void>;
    mount<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined>(ucManager: UCManager, appManifest: AppManifest, ucd: UCDef<I, OPI0, OPI1>, contract: UCHTTPContract): void;
}
export {};
