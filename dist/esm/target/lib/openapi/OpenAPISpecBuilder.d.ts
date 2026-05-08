import { WordingManager } from '../../../i18n/index.js';
import type { ProductManifest, ProductUCsLoaderOutput } from '../../../product/index.js';
import type { Configurable, I18nManager, SettingsManager, Worker } from '../../../std/index.js';
import type { ServerManagerSettings } from '../server/ServerManager.js';
import type { OpenAPISpec } from './types.js';
type Input = {
    ucs: ProductUCsLoaderOutput;
};
interface Output {
    spec: OpenAPISpec;
}
type S = Pick<ServerManagerSettings, 'server_cookies_name_auth' | 'server_public_api_key_header_name' | 'server_public_url'>;
export declare class OpenAPISpecBuilder implements Configurable<S>, Worker<Input, Promise<Output>> {
    private i18nManager;
    private productManifest;
    private settingsManager;
    private wordingManager;
    constructor(i18nManager: I18nManager, productManifest: ProductManifest, settingsManager: SettingsManager<S>, wordingManager: WordingManager);
    s(): S;
    exec({ ucs }: Input): Promise<Output>;
    private initErrors;
    private initOutput;
    private initPath;
}
export {};
