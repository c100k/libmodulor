import type { JWT } from '../../dt/index.js';
import type { ClockManager } from '../ClockManager.js';
import type { JWTManager, JWTManagerDecodeOpts, JWTManagerEncodeOpts, JWTManagerSettings } from '../JWTManager.js';
import type { SettingsManager } from '../SettingsManager.js';
export type S = Omit<JWTManagerSettings, 'jwt_manager_invalidate_issued_before'>;
export declare class JoseJWTManager implements JWTManager {
    private clockManager;
    private settingsManager;
    constructor(clockManager: ClockManager, settingsManager: SettingsManager<S>);
    s(): S;
    decode<T extends object>(value: JWT, opts?: JWTManagerDecodeOpts): Promise<T>;
    encode<T extends object>(payload: T, opts?: JWTManagerEncodeOpts): Promise<JWT>;
    isUsable(value: JWT): Promise<boolean>;
}
