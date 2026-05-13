import type { CallToolResult } from '@modelcontextprotocol/sdk/types';
import type { AppManifest } from '../../app/index.js';
import type { JWTManager, Worker } from '../../std/index.js';
import { UCBuilder, type UCDef, type UCInput, type UCManager, type UCOPIBase } from '../../uc/index.js';
import type { AuthDataStore } from '../lib/client/AuthDataStore.js';
import type { ToolInput } from './types.js';
interface Input<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> {
    appManifest: AppManifest;
    toolInput: ToolInput<I>;
    ucd: UCDef<I, OPI0, OPI1>;
    /**
     * It is not injected in the handler constructor because it must be the same as the one used in ServerManager.
     *
     * And in some cases, this latter is specific to a context : for instance in automated tests.
     */
    ucManager: UCManager;
}
type Output = CallToolResult;
export declare class RequestHandler implements Worker<Input, Promise<Output>> {
    private authDataStore;
    private jwtManager;
    private ucBuilder;
    private ucManager;
    constructor(authDataStore: AuthDataStore, jwtManager: JWTManager, ucBuilder: UCBuilder, ucManager: UCManager);
    exec<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined>({ appManifest, toolInput, ucd, ucManager, }: Input<I, OPI0, OPI1>): Promise<Output>;
    private auth;
    private applySideEffects;
    private applyClearAuthSideEffect;
    private applyRedirectSideEffect;
    private applySetAuthSideEffect;
}
export {};
