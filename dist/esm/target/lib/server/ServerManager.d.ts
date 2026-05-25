import type { AppManifest } from '../../../app/index.js';
import type { ApiKey, DirPath, FilePath, HostPort, HTTPMethod, Password, URL, URLPath, Username } from '../../../dt/index.js';
import type { ProductUCsLoaderOutput } from '../../../product/index.js';
import type { Settings } from '../../../std/index.js';
import type { UCDef, UCHTTPContract, UCInput, UCManager, UCOPIBase } from '../../../uc/index.js';
import type { HTTPCSPValue } from '../../../utils/http/types.js';
import type { HTTPCookieSameSite, HTTPHeaderName, Initializable } from '../../../utils/index.js';
import type { OpenAPISpec } from '../openapi/types.js';
import type { AuthCookieName, PublicApiKeyHeaderName } from '../shared.js';
export interface ServerManagerAuthSettings {
    server_basic_auth_entries: Record<Username, Password>;
    server_private_api_key_entries: ApiKey[];
    server_public_api_key_entries: ApiKey[];
}
export interface ServerManagerSettings extends ServerManagerAuthSettings, Settings {
    server_binding_host: 'localhost' | '0.0.0.0';
    server_binding_port: HostPort;
    server_cookies_http_only: boolean;
    server_cookies_name_auth: AuthCookieName;
    server_cookies_same_site: HTTPCookieSameSite;
    server_cookies_secure: boolean;
    server_csp_default_src: HTTPCSPValue;
    server_csp_img_src: HTTPCSPValue;
    server_csp_script_src: HTTPCSPValue;
    server_cors_credentials: boolean;
    server_cors_headers: HTTPHeaderName[];
    server_cors_methods: HTTPMethod[];
    server_cors_origins: URL[];
    server_expose_mcp: boolean;
    server_expose_mcp_at: URLPath;
    server_expose_openapi_spec: boolean;
    server_expose_openapi_spec_at: URLPath;
    server_mcp_dangerously_skip_pub_api_key_check: boolean;
    server_mcp_dangerously_skip_auth_check: boolean;
    server_public_api_key_header_name: PublicApiKeyHeaderName;
    server_public_url: URL;
    server_ssl_fullchain_path: FilePath | null;
    server_ssl_key_path: FilePath | null;
    server_static_dir_path: DirPath | null;
    server_stop_mode: 'aggressive' | 'patient';
    server_tmp_path: FilePath;
}
export interface ServerManager extends Initializable {
    overrideUCManager(ucManager: UCManager): void;
    /**
     * Mount the use case as an endpoint
     * @param appManifest
     * @param ucd
     * @param contract
     */
    mount<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined>(appManifest: AppManifest, ucd: UCDef<I, OPI0, OPI1>, contract: UCHTTPContract): Promise<void>;
    /**
     * Mount the use case as an endpoint
     * @param appManifest
     * @param ucd
     * @param contract
     */
    mountSync<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined>(appManifest: AppManifest, ucd: UCDef<I, OPI0, OPI1>, contract: UCHTTPContract): void;
    /**
     * Mount the MCP endpoint
     * @param spec
     */
    mountMCP(ucs: ProductUCsLoaderOutput, at: URLPath): Promise<void>;
    /**
     * Mount the OpenAPI spec
     * @param spec
     */
    mountOpenAPISpec(spec: OpenAPISpec, at: URLPath): Promise<void>;
    /**
     * Mount the static directory at `/`
     * @param dirPath
     */
    mountStaticDir(dirPath: DirPath): Promise<void>;
    /**
     * Start listening on the specific host and port
     */
    start(): Promise<void>;
    /**
     * Stop listening
     */
    stop(): Promise<void>;
    /**
     * Warm up with things that must be done after the routes have been defined (e.g. error middleware, etc.)
     */
    warmUp(): Promise<void>;
}
