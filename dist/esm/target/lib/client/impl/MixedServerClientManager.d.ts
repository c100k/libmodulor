import type { ApiKey, JWT, URL } from '../../../../dt/index.js';
import { SettingsServerClientManager } from '../../../../std/impl/SettingsServerClientManager.js';
import type { HTTPAPICallerBasicAuth } from '../../../../std/index.js';
import type { AuthDataStore } from '../AuthDataStore.js';
import type { ServerClientManager, ServerClientManagerOpts } from '../ServerClientManager.js';
export declare class MixedServerClientManager implements ServerClientManager {
    private authDataStore;
    private settingsServerClientManager;
    constructor(authDataStore: AuthDataStore, settingsServerClientManager: SettingsServerClientManager);
    authApiKey(opts?: ServerClientManagerOpts): Promise<ApiKey | null>;
    authBasic(opts?: ServerClientManagerOpts): Promise<HTTPAPICallerBasicAuth | null>;
    authJWT(_opts?: ServerClientManagerOpts): Promise<JWT | null>;
    baseURL(opts?: ServerClientManagerOpts): Promise<URL>;
    publicApiKey(opts?: ServerClientManagerOpts): Promise<ApiKey | null>;
}
