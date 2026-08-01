import { ServerCredentials } from '@grpc/grpc-js';
import type { BufferManager, Configurable, Logger, SettingsManager, Worker } from '../../../std/index.js';
import type { ServerManagerSettings } from '../server/ServerManager.js';
import { ServerSSLCertLoader } from '../server/ServerSSLCertLoader.js';
type Input = {};
interface Output {
    creds: ServerCredentials;
}
type S = Pick<ServerManagerSettings, 'server_binding_port'>;
export declare class ServerCredentialsCreator implements Configurable<S>, Worker<Input, Promise<Output>> {
    private bufferManager;
    protected logger: Logger;
    private serverSSLCertLoader;
    private settingsManager;
    constructor(bufferManager: BufferManager, logger: Logger, serverSSLCertLoader: ServerSSLCertLoader, settingsManager: SettingsManager<S>);
    s(): S;
    exec(_input: Input): Promise<Output>;
}
export {};
