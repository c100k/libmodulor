import type { ApiKey, JWT, Password, SSHPublicKey, Timestamp } from '../dt/index.js';
import type { Settings } from './SettingsManager.js';
export type JWTSecret = Password;
export type JWTManagerPayload = {
    exp?: Timestamp;
    iat?: Timestamp;
};
export interface JWTManagerSettings extends Settings {
    jwt_manager_algorithm: 'HS256' | 'HS512' | 'RS256';
    jwt_manager_audience: string;
    jwt_manager_expires_in: string;
    jwt_manager_invalidate_issued_before: Timestamp | null;
    jwt_manager_issuer: string;
    jwt_manager_key_id: ApiKey | null;
    jwt_manager_secret: JWTSecret;
    jwt_manager_subject: string | null;
}
export type JWTManagerDecodeOpts = Pick<JWTManagerEncodeOpts, 'secret'> & {
    spki?: SSHPublicKey;
};
export interface JWTManagerEncodeOpts {
    alg?: JWTManagerSettings['jwt_manager_algorithm'];
    aud?: JWTManagerSettings['jwt_manager_audience'];
    exp?: JWTManagerSettings['jwt_manager_expires_in'];
    iss?: JWTManagerSettings['jwt_manager_issuer'];
    kid?: JWTManagerSettings['jwt_manager_key_id'];
    secret?: JWTManagerSettings['jwt_manager_secret'];
    sub?: JWTManagerSettings['jwt_manager_subject'];
}
export interface JWTManager {
    decode<T extends JWTManagerPayload>(value: JWT, opts?: JWTManagerDecodeOpts): Promise<T>;
    encode<T extends object>(payload: T, opts?: JWTManagerEncodeOpts): Promise<JWT>;
    isUsable(value: JWT): Promise<boolean>;
}
