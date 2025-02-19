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
    /**
     * The public key to verify JWTs using an `alg` of type `RS*`
     */
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
    /**
     * Decode the token
     *
     * Pass the ad-hoc opts when using a specific `alg` (e.g. `spki` when decoding a `RS*` token).
     * If invalid, it must throw an {@link UnauthorizedError} (no errors related to the impl. should be thrown).
     *
     * @param value
     * @param opts
     */
    decode<T extends JWTManagerPayload>(value: JWT, opts?: JWTManagerDecodeOpts): Promise<T>;
    /**
     * Encode the payload
     *
     * It uses the global {@link JWTManagerSettings} or the ones provided via `opts`.
     *
     * @param payload
     * @param opts
     */
    encode<T extends object>(payload: T, opts?: JWTManagerEncodeOpts): Promise<JWT>;
    /**
     * Check whether the token is usable or not
     *
     * Note that the signature is not checked. Indeed, the main purpose of this method is to be used client side to save some requests (e.g. when the token is expired).
     * In this case, no need to send a request that will trigger an error. Better to renew the token at the client's initiative.
     */
    isUsable(value: JWT): Promise<boolean>;
}
