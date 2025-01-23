import type { URL } from '../../../dt/index.js';
import type { Configurable, SettingsManager, Worker } from '../../../std/index.js';
import type { ServerManagerSettings } from './ServerManager.js';
interface Output {
    http: URL;
    tcp: string;
}
type S = Pick<ServerManagerSettings, 'server_binding_host' | 'server_binding_port'>;
export declare class EntrypointsBuilder implements Configurable<S>, Worker<void, Output> {
    private settingsManager;
    constructor(settingsManager: SettingsManager<S>);
    s(): S;
    exec(): Output;
}
export {};
