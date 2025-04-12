import type { AppManifest } from '../../../app/index.js';
import type { HTTPMethod, HTTPStatusNumber, URL, URLPath } from '../../../dt/index.js';
import type { SettingsManager, Worker } from '../../../std/index.js';
import { UCBuilder, type UCDef, type UCInput, type UCManager, type UCOPIBase, type UCOutput } from '../../../uc/index.js';
import type { HTTPDataEnvelope, HTTPReqData } from '../../../utils/index.js';
import { AuthCookieCreator, type Output as AuthCookieCreatorOutput } from './AuthCookieCreator.js';
import { AuthenticationChecker } from './AuthenticationChecker.js';
import { CustomerFacingErrorBuilder } from './CustomerFacingErrorBuilder.js';
import { PublicApiKeyChecker } from './PublicApiKeyChecker.js';
import { RequestChecker } from './RequestChecker.js';
import { RequestLogger } from './RequestLogger.js';
import type { ServerManagerSettings } from './ServerManager.js';
export interface ServerRequestHandlerReq {
    cookie: (name: string) => Promise<string | undefined>;
    bodyFromFormData: () => Promise<HTTPReqData>;
    bodyFromJSON: () => Promise<HTTPReqData>;
    bodyFromQueryParams: () => Promise<HTTPReqData>;
    bodyRaw: object | null;
    method: HTTPMethod;
    header: (name: string) => Promise<string | undefined>;
    secure: boolean;
    url: URL;
}
export interface ServerRequestHandlerRes {
    clearCookie: (name: string) => Promise<void>;
    redirect: (location: URL | URLPath) => Promise<void>;
    setCookie: (info: AuthCookieCreatorOutput) => Promise<void>;
}
interface Input<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> {
    appManifest: AppManifest;
    envelope: HTTPDataEnvelope;
    req: ServerRequestHandlerReq;
    res: ServerRequestHandlerRes;
    ucd: UCDef<I, OPI0, OPI1>;
    /**
     * It is not injected in the handler constructor because it must be the same as the one used in ServerManager.
     *
     * And in some cases, this latter is specific to a context : for instance in automated tests.
     */
    ucManager: UCManager;
}
type BodylessStatus = 204 | 302;
type Output<OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> = {
    body: undefined;
    status: BodylessStatus;
} | {
    body: UCOutput<OPI0, OPI1> | object;
    status: Exclude<HTTPStatusNumber, BodylessStatus>;
};
type S = Pick<ServerManagerSettings, 'server_cookies_name_auth' | 'server_public_api_key_header_name'>;
export declare class ServerRequestHandler implements Worker<Input, Promise<Output>> {
    private authCookieCreator;
    private authenticationChecker;
    private customerFacingErrorBuilder;
    private publicApiKeyChecker;
    private requestChecker;
    private requestLogger;
    private settingsManager;
    private ucBuilder;
    private static AUTHORIZATION_HEADER_NAME;
    private static X_FORWARDED_PROTO_HEADER_NAME;
    constructor(authCookieCreator: AuthCookieCreator, authenticationChecker: AuthenticationChecker, customerFacingErrorBuilder: CustomerFacingErrorBuilder, publicApiKeyChecker: PublicApiKeyChecker, requestChecker: RequestChecker, requestLogger: RequestLogger, settingsManager: SettingsManager<S>, ucBuilder: UCBuilder);
    s(): S;
    exec<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined>({ appManifest, envelope, req, res, ucd, ucManager, }: Input<I, OPI0, OPI1>): Promise<Output<OPI0, OPI1>>;
    private fill;
    private applySideEffects;
    private applyClearAuthSideEffect;
    private applyRedirectSideEffect;
    private applySetAuthSideEffect;
}
export {};
