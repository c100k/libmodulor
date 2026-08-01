import { status } from '@grpc/grpc-js';
import type { AppManifest } from '../../../app/index.js';
import type { URL } from '../../../dt/index.js';
import type { SettingsManager, Worker } from '../../../std/index.js';
import { UCBuilder, type UCDef, type UCInput, type UCManager, type UCManagerExecServerOpts, type UCOPIBase, type UCOutput } from '../../../uc/index.js';
import type { GRPCReqData } from '../../../utils/index.js';
import { AuthenticationChecker } from '../server/AuthenticationChecker.js';
import { CustomerFacingErrorBuilder } from '../server/CustomerFacingErrorBuilder.js';
import { PublicApiKeyChecker } from '../server/PublicApiKeyChecker.js';
import { RequestChecker } from '../server/RequestChecker.js';
import { RequestLogger } from '../server/RequestLogger.js';
import type { ServerManagerSettings } from '../server/ServerManager.js';
import { RequestFileHandler } from './RequestFileHandler.js';
export interface ServerRequestHandlerReq {
    bodyFromRequest: () => Promise<GRPCReqData>;
    bodyRaw: GRPCReqData | null;
    metadata: (name: string) => Promise<string | undefined>;
    secure: boolean;
    url: URL;
}
export interface ServerRequestHandlerRes {
    setMetadata: (name: string, value: string) => Promise<void>;
}
export interface ServerRequestHandlerInput<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> {
    appManifest: AppManifest;
    dangerouslySkipAuthCheck?: boolean | undefined;
    dangerouslySkipPubApiKeyCheck?: boolean | undefined;
    execOpts?: UCManagerExecServerOpts<OPI0, OPI1> | undefined;
    req: ServerRequestHandlerReq;
    res: ServerRequestHandlerRes;
    skipSideEffects?: boolean | undefined;
    ucd: UCDef<I, OPI0, OPI1>;
    /**
     * It is not injected in the handler constructor because it must be the same as the one used in ServerManager.
     *
     * And in some cases, this latter is specific to a context : for instance in automated tests.
     */
    ucManager: UCManager;
}
type Output<OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> = ({
    body: undefined;
    status: status;
} | {
    body: UCOutput<OPI0, OPI1> | object;
    rawErr?: Error;
    status: status;
}) & {
    rawErr?: Error;
};
type S = Pick<ServerManagerSettings, 'server_cookies_name_auth' | 'server_public_api_key_header_name' | 'server_tmp_path'>;
export declare class ServerRequestHandler implements Worker<ServerRequestHandlerInput, Promise<Output>> {
    private authenticationChecker;
    private customerFacingErrorBuilder;
    private publicApiKeyChecker;
    private requestChecker;
    private requestFileHandler;
    private requestLogger;
    private settingsManager;
    private ucBuilder;
    constructor(authenticationChecker: AuthenticationChecker, customerFacingErrorBuilder: CustomerFacingErrorBuilder, publicApiKeyChecker: PublicApiKeyChecker, requestChecker: RequestChecker, requestFileHandler: RequestFileHandler, requestLogger: RequestLogger, settingsManager: SettingsManager<S>, ucBuilder: UCBuilder);
    s(): S;
    exec<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined>({ appManifest, dangerouslySkipAuthCheck, dangerouslySkipPubApiKeyCheck, execOpts, req, res, skipSideEffects, ucd, ucManager, }: ServerRequestHandlerInput<I, OPI0, OPI1>): Promise<Output<OPI0, OPI1>>;
    private fill;
    private applySideEffects;
    private applyClearAuthSideEffect;
    private applyRedirectSideEffect;
    private applySetAuthSideEffect;
}
export {};
