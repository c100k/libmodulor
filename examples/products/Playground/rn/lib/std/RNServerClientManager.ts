import { inject, injectable } from 'inversify';

import {
    type ApiKey,
    type HTTPAPICallerBasicAuth,
    type JWT,
    type ServerClientManager,
    type ServerClientManagerOpts,
    SettingsServerClientManager,
    type URL,
} from '../../../../../../dist/esm/index.js';
import type { AuthDataStore } from '../uc/AuthDataStore.js';

@injectable()
export class RNServerClientManager implements ServerClientManager {
    constructor(
        @inject('AuthDataStore') private authDataStore: AuthDataStore,
        @inject(SettingsServerClientManager)
        private settingsServerClientManager: SettingsServerClientManager,
    ) {}

    public async authApiKey(
        opts?: ServerClientManagerOpts,
    ): Promise<ApiKey | null> {
        return this.settingsServerClientManager.authApiKey(opts);
    }

    public async authBasic(
        opts?: ServerClientManagerOpts,
    ): Promise<HTTPAPICallerBasicAuth | null> {
        return this.settingsServerClientManager.authBasic(opts);
    }

    public async authJWT(_opts?: ServerClientManagerOpts): Promise<JWT | null> {
        return this.authDataStore.get();
    }

    public async baseURL(opts?: ServerClientManagerOpts): Promise<URL> {
        return this.settingsServerClientManager.baseURL(opts);
    }

    public async publicApiKey(
        opts?: ServerClientManagerOpts,
    ): Promise<ApiKey | null> {
        return this.settingsServerClientManager.publicApiKey(opts);
    }
}
