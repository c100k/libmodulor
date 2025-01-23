import type { BufferManager, Configurable, Logger, SettingsManager, Worker } from '../../../std/index.js';
import type { UCAuth } from '../../../uc/index.js';
import type { ServerManagerSettings } from './ServerManager.js';
interface Input {
    rawValue: string | undefined;
}
export type Output = UCAuth;
type S = Pick<ServerManagerSettings, 'server_basic_auth_entries'>;
export declare class BasicAuthenticationChecker implements Configurable<S>, Worker<Input, Promise<Output | null>> {
    private bufferManager;
    private logger;
    private settingsManager;
    constructor(bufferManager: BufferManager, logger: Logger, settingsManager: SettingsManager<S>);
    s(): S;
    exec({ rawValue }: Input): Promise<Output | null>;
}
export {};
