import type { Request, RequestHandler } from 'express';
import type { Configurable, SettingsManager, Worker } from '../../../std/index.js';
import { type UCAuth, UCBuilder, type UCInput, type UCOPIBase } from '../../../uc/index.js';
import { AuthenticationChecker, type AuthenticationCheckerInputRaw } from '../../lib/server/AuthenticationChecker.js';
import type { ServerManagerSettings } from '../../lib/server/ServerManager.js';
type Input<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> = AuthenticationCheckerInputRaw<I, OPI0, OPI1>;
type Output = RequestHandler;
interface ReqAuthenticated extends Request {
    auth: UCAuth;
}
export declare function isReqAuthenticated(req: Request): req is ReqAuthenticated;
type S = Pick<ServerManagerSettings, 'server_cookies_name_auth'>;
export declare class AuthenticationCheckerMiddlewareBuilder<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> implements Configurable<S>, Worker<Input<I, OPI0, OPI1>, Output> {
    private authenticationChecker;
    private settingsManager;
    private ucBuilder;
    constructor(authenticationChecker: AuthenticationChecker, settingsManager: SettingsManager<S>, ucBuilder: UCBuilder);
    s(): S;
    exec({ appManifest, ucd }: Input<I, OPI0, OPI1>): Output;
}
export {};
