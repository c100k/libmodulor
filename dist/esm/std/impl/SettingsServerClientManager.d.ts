import type { ApiKey, JWT, URL } from '../../dt/index.js';
import type { ServerClientManager, ServerClientManagerOpts, ServerClientManagerSettings } from '../../target/lib/client/ServerClientManager.js';
import type { HTTPAPICallerBasicAuth } from '../HTTPAPICaller.js';
import type { Configurable, SettingsManager } from '../SettingsManager.js';
type S = ServerClientManagerSettings;
export declare class SettingsServerClientManager implements Configurable<S>, ServerClientManager {
    private settingsManager;
    constructor(settingsManager: SettingsManager<S>);
    s(): S;
    authApiKey(_opts?: ServerClientManagerOpts): Promise<ApiKey | null>;
    authBasic(_opts?: ServerClientManagerOpts): Promise<HTTPAPICallerBasicAuth | null>;
    authJWT(opts?: ServerClientManagerOpts): Promise<JWT | null>;
    baseURL(_opts?: ServerClientManagerOpts): Promise<URL>;
    publicApiKey(_opts?: ServerClientManagerOpts): Promise<ApiKey | null>;
}
export {};
