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
    server_csp_default_src: [],
    server_csp_img_src: [],
    server_csp_script_src: [],
    server_private_api_key_entries: [],
    server_public_api_key_entries: ['PublicApiKeyToBeChangedWhenDeploying'],
    server_public_api_key_header_name: 'X-API-Key',
    server_public_url: 'http://localhost:7443',
    server_ssl_fullchain_path: null,
    server_ssl_key_path: null,
    server_static_dir_path: null,
    server_stop_mode: 'patient',
    server_tmp_path: 'tmp',
};
