import type { SemVerVersion } from '../../dt/index.js';
export type AuthCookieName = 'auth';
export type PublicApiKeyHeaderName = 'X-API-Key' | (string & {});
export declare const AUTHORIZATION_HEADER_NAME = "Authorization";
export declare const DEFAULT_VERSION: SemVerVersion;
