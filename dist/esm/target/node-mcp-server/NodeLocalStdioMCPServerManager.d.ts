import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import type { AppManifest } from '../../app/index.js';
import type { DirPath } from '../../dt/index.js';
import { WordingManager } from '../../i18n/index.js';
import type { ProductManifest } from '../../product/index.js';
import type { Configurable, LoggerSettings, SettingsManager } from '../../std/index.js';
import { UCBuilder, type UCDef, type UCHTTPContract, type UCInput, type UCManager, type UCOPIBase } from '../../uc/index.js';
import type { ServerManager } from '../lib/server/ServerManager.js';
type S = Pick<LoggerSettings, 'logger_level'>;
/**
 * A simple MCP Server implementation
 *
 * Although it implements {@link ServerManager}, this implementation is not necessarily a "server".
 * Indeed, it uses a local `Transport` so it must be considered the same as a {@link NodeCoreCLIManager}.
 * Therefore, it calls `execClient` and not `execServer`.
 * This way, Claude AI, or any other client is just a wrapper on top of it.
 *
 * @alpha This implementation still has lots of TODOs and has not been tested in real conditions. It needs to be stabilized before usage.
 */
export declare class NodeLocalStdioMCPServerManager implements Configurable<S>, ServerManager {
    private productManifest;
    private settingsManager;
    private ucBuilder;
    private ucManager;
    private wordingManager;
    protected runtime: Server;
    private transport;
    private appManifests;
    private tools;
    constructor(productManifest: ProductManifest, settingsManager: SettingsManager<S>, ucBuilder: UCBuilder, ucManager: UCManager, wordingManager: WordingManager);
    s(): S;
    overrideUCManager(ucManager: UCManager): void;
    init(): Promise<void>;
    initSync(): void;
    mount<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined>(appManifest: AppManifest, ucd: UCDef<I, OPI0, OPI1>, _contract: UCHTTPContract): Promise<void>;
    mountStaticDir(_dirPath: DirPath): Promise<void>;
    start(): Promise<void>;
    stop(): Promise<void>;
    warmUp(): Promise<void>;
    private buildInputSchema;
    private execRequest;
    private initCommon;
}
export {};
