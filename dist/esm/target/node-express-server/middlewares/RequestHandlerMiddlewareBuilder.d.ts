import type { RequestHandler } from 'express';
import type { Configurable, SettingsManager, Worker } from '../../../std/index.js';
import { UCBuilder, type UCInput, type UCOPIBase } from '../../../uc/index.js';
import type { RequestHandlerInputRaw } from '../../lib/server/RequestHandler.js';
import type { ServerManagerSettings } from '../../lib/server/ServerManager.js';
import { AuthCookieCreator } from '../lib/AuthCookieCreator.js';
type Input<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> = RequestHandlerInputRaw<I, OPI0, OPI1>;
type Output = RequestHandler;
type S = Pick<ServerManagerSettings, 'server_cookies_name_auth'>;
export declare class RequestHandlerMiddlewareBuilder<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> implements Configurable<S>, Worker<Input<I, OPI0, OPI1>, Output> {
    private authCookieCreator;
    private settingsManager;
    private ucBuilder;
    constructor(authCookieCreator: AuthCookieCreator, settingsManager: SettingsManager<S>, ucBuilder: UCBuilder);
    s(): S;
    exec({ appManifest, envelope, ucd, ucManager, }: Input<I, OPI0, OPI1>): Output;
    private fillUCFromReq;
    private handleClearAuth;
    private handleRedirect;
    private handleSetAuth;
    private toFile;
}
export {};
