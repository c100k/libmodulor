import type { Configurable, SettingsManager, Worker } from '../../../std/index.js';
import type { UCAuth } from '../../../uc/index.js';
import type { ServerManagerSettings } from './ServerManager.js';
interface Input {
    rawValue: string | undefined;
}
type Output = UCAuth;
type S = Pick<ServerManagerSettings, 'server_private_api_key_entries'>;
export declare class PrivateApiKeyAuthenticationChecker implements Configurable<S>, Worker<Input, Promise<Output | null>> {
    private settingsManager;
    constructor(settingsManager: SettingsManager<S>);
    s(): S;
    exec({ rawValue }: Input): Promise<Output | null>;
}
export {};
