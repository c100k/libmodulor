import type { RequestHandler } from 'express';
import type { Configurable, SettingsManager, Worker } from '../../../std/index.js';
import type { ServerManagerSettings } from '../server/ServerManager.js';
interface Input {
}
type Output = RequestHandler;
type S = Pick<ServerManagerSettings, 'server_cors_credentials' | 'server_cors_headers' | 'server_cors_methods' | 'server_cors_origins' | 'server_public_api_key_header_name'>;
export declare class CORSMiddlewareBuilder implements Configurable<S>, Worker<Input, Output> {
    private settingsManager;
    constructor(settingsManager: SettingsManager<S>);
    s(): S;
    exec(_input: Input): Output;
    private fmt;
}
export {};
