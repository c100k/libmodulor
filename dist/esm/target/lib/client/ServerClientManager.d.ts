import type { ApiKey, JWT, URL } from '../../../dt/index.js';
import type { HTTPAPICallerBasicAuth, Settings } from '../../../std/index.js';
import type { UCAuth, UCAuthRole } from '../../../uc/index.js';
import type { AuthCookieName, PublicApiKeyHeaderName } from '../shared.js';
export interface ServerClientManagerSettings extends Settings {
    server_cookies_name_auth?: AuthCookieName | undefined;
    server_dangerously_set_api_key?: ApiKey | undefined;
    server_dangerously_set_basic?: HTTPAPICallerBasicAuth | undefined;
    server_dangerously_set_jwts?: Record<UCAuthRole, JWT> | undefined;
    server_public_api_key: ApiKey | null;
    server_public_api_key_header_name: PublicApiKeyHeaderName | null;
    server_public_url: URL | null;
}
export interface ServerClientManagerPublicApiKeyHeader {
    name: PublicApiKeyHeaderName;
    value: ApiKey;
}
export interface ServerClientManagerOpts {
    auth: UCAuth | null;
}
export interface ServerClientManager {
    authApiKey(opts?: ServerClientManagerOpts): Promise<ApiKey | null>;
    authBasic(opts?: ServerClientManagerOpts): Promise<HTTPAPICallerBasicAuth | null>;
    authJWT(opts?: ServerClientManagerOpts): Promise<JWT | null>;
    baseURL(opts?: ServerClientManagerOpts): Promise<URL>;
    publicApiKey(opts?: ServerClientManagerOpts): Promise<ApiKey | null>;
}
