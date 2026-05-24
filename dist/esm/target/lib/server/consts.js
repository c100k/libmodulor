import { unsafeDefaultSetting } from '../../../std/index.js';
/**
 * @see TARGET_DEFAULT_SERVER_CLIENT_MANAGER_SETTINGS
 */
export const TARGET_DEFAULT_SERVER_MANAGER_SETTINGS = {
    server_basic_auth_entries: {},
    server_binding_host: 'localhost',
    server_binding_port: 7443,
    server_cookies_http_only: true,
    server_cookies_name_auth: 'auth',
    server_cookies_same_site: 'strict',
    server_cookies_secure: true,
    server_cors_credentials: false,
    server_cors_headers: [],
    server_cors_methods: [],
    server_cors_origins: [],
    server_csp_default_src: [],
    server_csp_img_src: [],
    server_csp_script_src: [],
    server_expose_mcp: false,
    server_expose_mcp_at: '/mcp',
    server_expose_openapi_spec: false,
    server_expose_openapi_spec_at: '/api/openapi.json',
    server_private_api_key_entries: [],
    server_public_api_key_entries: [unsafeDefaultSetting()],
    server_public_api_key_header_name: 'X-API-Key',
    server_public_url: 'http://localhost:7443',
    server_ssl_fullchain_path: null,
    server_ssl_key_path: null,
    server_static_dir_path: null,
    server_stop_mode: 'patient',
    server_tmp_path: 'tmp',
};
export const TARGET_USUAL_SERVER_MANAGER_CORS_HEADERS = [
    'Accept',
    'Authorization',
    'Content-Type',
    'Cookie',
    'Origin',
    'X-Requested-With',
];
export const TARGET_USUAL_SERVER_MANAGER_CORS_METHODS = [
    'DELETE',
    'GET',
    'HEAD',
    'OPTIONS',
    'POST',
    'PUT',
];
