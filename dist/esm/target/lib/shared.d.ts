import type { SemVerVersion } from '../../dt/index.js';
import type { HTTPHeaderName } from '../../utils/index.js';
export type AuthCookieName = 'auth';
export type PublicApiKeyHeaderName = 'X-API-Key' | (string & {});
export declare const AUTHORIZATION_HEADER_NAME: HTTPHeaderName;
export declare const DEFAULT_VERSION: SemVerVersion;
