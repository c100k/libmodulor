import type { Configurable, FSManager, SettingsManager, Worker } from '../../../std/index.js';
import type { ServerManagerSettings } from './ServerManager.js';
type Input = undefined;
type Cert = string;
type Key = string;
interface Output {
    cert: Cert;
    key: Key;
}
type S = Pick<ServerManagerSettings, 'server_ssl_fullchain_path' | 'server_ssl_key_path'>;
export declare class ServerSSLCertLoader implements Configurable<S>, Worker<Input, Promise<Output>> {
    private fsManager;
    private settingsManager;
    constructor(fsManager: FSManager, settingsManager: SettingsManager<S>);
    s(): S;
    exec(_input: Input): Promise<Output>;
}
export {};
