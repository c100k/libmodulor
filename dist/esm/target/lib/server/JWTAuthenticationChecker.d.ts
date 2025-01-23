import type { Configurable, JWTManager, JWTManagerPayload, JWTManagerSettings, Logger, SettingsManager, Worker } from '../../../std/index.js';
import type { UCAuth } from '../../../uc/index.js';
interface Input {
    rawValue: string | undefined;
}
type Output = JWTManagerPayload & UCAuth;
type S = Pick<JWTManagerSettings, 'jwt_manager_invalidate_issued_before'>;
export declare class JWTAuthenticationChecker implements Configurable<S>, Worker<Input, Promise<Output | null>> {
    private jwtManager;
    private logger;
    private settingsManager;
    constructor(jwtManager: JWTManager, logger: Logger, settingsManager: SettingsManager<S>);
    s(): S;
    exec({ rawValue }: Input): Promise<Output | null>;
    private mustBeInvalidated;
}
export {};
