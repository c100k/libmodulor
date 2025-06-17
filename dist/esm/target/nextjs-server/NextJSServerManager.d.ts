import type { AppManifest } from '../../app/index.js';
import type { DirPath } from '../../dt/index.js';
import type { UCDef, UCHTTPContract, UCInput, UCManager, UCOPIBase } from '../../uc/index.js';
import type { ServerManager } from '../lib/server/ServerManager.js';
export declare class NextJSServerManager implements ServerManager {
    overrideUCManager(_ucManager: UCManager): void;
    init(): Promise<void>;
    initSync(): void;
    mount<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined>(_appManifest: AppManifest, _ucd: UCDef<I, OPI0, OPI1>, _contract: UCHTTPContract): Promise<void>;
    mountStaticDir(_dirPath: DirPath): Promise<void>;
    start(): Promise<void>;
    stop(): Promise<void>;
    warmUp(): Promise<void>;
}
