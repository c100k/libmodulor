import type { Configurable, Logger, SettingsManager, Worker } from '../../../std/index.js';
import { type UCSecPublicApiKeyCheckType } from '../../../uc/index.js';
import type { ServerManagerSettings } from './ServerManager.js';
interface Input {
    checkType: UCSecPublicApiKeyCheckType | undefined;
    value: string | string[] | undefined;
}
type S = Pick<ServerManagerSettings, 'server_public_api_key_entries'>;
export declare class PublicApiKeyChecker implements Configurable<S>, Worker<Input, Promise<void>> {
    private logger;
    private settingsManager;
    constructor(logger: Logger, settingsManager: SettingsManager<S>);
    s(): S;
    exec({ checkType, value, }: Input): Promise<void>;
}
export {};
