export type UCSecAuthType = 'apiKey' | 'basic' | 'jwt';
export type UCSecPublicApiKeyCheckType = 'off' | 'on';
export interface UCSec {
    authType?: UCSecAuthType;
    publicApiKeyCheckType?: UCSecPublicApiKeyCheckType;
}
