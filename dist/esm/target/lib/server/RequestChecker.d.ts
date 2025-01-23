import type { URL } from '../../../dt/index.js';
import type { Configurable, EnvironmentManager, Logger, SettingsManager, Worker } from '../../../std/index.js';
import type { ServerManagerSettings } from './ServerManager.js';
interface Input {
    secure: boolean;
    url: URL;
    xForwardedProtoHeader: string | undefined;
}
type S = Pick<ServerManagerSettings, 'server_binding_port'>;
export declare class RequestChecker implements Configurable<S>, Worker<Input, void> {
    private environmentManager;
    private logger;
    private settingsManager;
    constructor(environmentManager: EnvironmentManager, logger: Logger, settingsManager: SettingsManager<S>);
    s(): S;
    exec({ secure, url, xForwardedProtoHeader }: Input): void;
}
export {};
