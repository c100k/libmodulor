import type { RequestHandler } from 'express';
import type { Configurable, SettingsManager, Worker } from '../../../std/index.js';
import type { UCSec } from '../../../uc/index.js';
import { PublicApiKeyChecker } from '../../lib/server/PublicApiKeyChecker.js';
import type { ServerManagerSettings } from '../../lib/server/ServerManager.js';
interface Input {
    checkType: UCSec['publicApiKeyCheckType'];
}
type Output = RequestHandler;
type S = Pick<ServerManagerSettings, 'server_public_api_key_header_name'>;
export declare class PublicApiKeyCheckerMiddlewareBuilder implements Configurable<S>, Worker<Input, Output> {
    private publicApiKeyChecker;
    private settingsManager;
    constructor(publicApiKeyChecker: PublicApiKeyChecker, settingsManager: SettingsManager<S>);
    s(): S;
    exec({ checkType }: Input): Output;
}
export {};
