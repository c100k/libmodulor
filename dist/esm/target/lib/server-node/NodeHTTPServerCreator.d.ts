import { type RequestListener } from 'node:http';
import type { Configurable, Logger, SettingsManager, Worker } from '../../../std/index.js';
import { ServerSSLCertLoader } from '../server/ServerSSLCertLoader.js';
import type { CreateSettings, Server } from './types.js';
interface Input {
    listener?: RequestListener | undefined;
}
interface Output {
    server: Server;
}
type S = CreateSettings;
export declare class NodeHTTPServerCreator implements Configurable<S>, Worker<Input, Promise<Output>> {
    protected logger: Logger;
    private serverSSLCertLoader;
    private settingsManager;
    constructor(logger: Logger, serverSSLCertLoader: ServerSSLCertLoader, settingsManager: SettingsManager<S>);
    s(): CreateSettings;
    exec({ listener }: Input): Promise<Output>;
}
export {};
