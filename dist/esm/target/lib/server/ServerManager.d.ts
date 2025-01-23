import type { AppManifest } from '../../../app/index.js';
import type { ApiKey, DirPath, FilePath, HostPort, Password, URL, Username } from '../../../dt/index.js';
import type { Settings } from '../../../std/index.js';
import type { UCDef, UCHTTPContract, UCInput, UCManager, UCOPIBase } from '../../../uc/index.js';
import type { Initializable } from '../../../utils/index.js';
import type { AuthCookieName, PublicApiKeyHeaderName } from '../shared.js';
export type ServerManagerCSPDefType = 'defaultSrc' | 'imgSrc' | 'scriptSrc';
export type ServerManagerCSPDefValue = URL[];
export type ServerManagerCSPDef = Record<ServerManagerCSPDefType, ServerManagerCSPDefValue>;
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
    server_cookies_same_site: 'strict';
    server_cookies_secure: boolean;
    server_csp_default_src: ServerManagerCSPDefValue;
    server_csp_img_src: ServerManagerCSPDefValue;
    server_csp_script_src: ServerManagerCSPDefValue;
    server_public_api_key_header_name: PublicApiKeyHeaderName;
    server_public_url: URL;
    server_ssl_fullchain_path: FilePath | null;
    server_ssl_key_path: FilePath | null;
    server_static_dir_path: DirPath | null;
    server_tmp_path: FilePath;
}
export interface ServerManager extends Initializable {
    overrideUCManager(ucManager: UCManager): void;
    mount<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined>(appManifest: AppManifest, ucd: UCDef<I, OPI0, OPI1>, contract: UCHTTPContract): Promise<void>;
    mountStaticDir(dirPath: DirPath): Promise<void>;
    start(): Promise<void>;
    stop(): Promise<void>;
    warmUp(): Promise<void>;
}
