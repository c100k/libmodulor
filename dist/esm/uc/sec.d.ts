export type UCSecAuthType = 'apiKey' | 'basic' | 'jwt';
export type UCSecPublicApiKeyCheckType = 'off' | 'on';
/**
 * Definition of the security scheme of a use case
 */
export interface UCSec {
    /**
     * @defaultValue {@link DEFAULT_UC_SEC_AT}
     */
    authType?: UCSecAuthType;
    /**
     * @defaultValue {@link DEFAULT_UC_SEC_PAKCT}
     */
    publicApiKeyCheckType?: UCSecPublicApiKeyCheckType;
}
