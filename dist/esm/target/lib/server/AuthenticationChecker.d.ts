import { type interfaces } from 'inversify';
import type { AppManifest } from '../../../app/index.js';
import type { Logger, Worker } from '../../../std/index.js';
import { type UC, type UCAuth, type UCDef, type UCInput, type UCOPIBase, type UCPolicy } from '../../../uc/index.js';
import { BasicAuthenticationChecker } from './BasicAuthenticationChecker.js';
import { JWTAuthenticationChecker } from './JWTAuthenticationChecker.js';
import { PrivateApiKeyAuthenticationChecker } from './PrivateApiKeyAuthenticationChecker.js';
export interface AuthenticationCheckerInputRaw<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> {
    appManifest: AppManifest;
    ucd: UCDef<I, OPI0, OPI1>;
}
interface Input<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> {
    authCookie: string | string[] | undefined;
    authorizationHeader: string | string[] | undefined;
    uc: UC<I, OPI0, OPI1>;
}
interface Output {
    allowed: boolean;
    auth: UCAuth | null;
}
export declare class AuthenticationChecker implements Worker<Input, Promise<Output>> {
    private basicAuthenticationChecker;
    private jwtAuthenticationChecker;
    private privateApiKeyAuthenticationChecker;
    private logger;
    private ucPolicyProvider;
    constructor(basicAuthenticationChecker: BasicAuthenticationChecker, jwtAuthenticationChecker: JWTAuthenticationChecker, privateApiKeyAuthenticationChecker: PrivateApiKeyAuthenticationChecker, logger: Logger, ucPolicyProvider: interfaces.Provider<UCPolicy>);
    exec<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined>({ authCookie, authorizationHeader, uc, }: Input<I, OPI0, OPI1>): Promise<Output>;
}
export {};
