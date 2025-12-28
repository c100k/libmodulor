import { unsafeDefaultSetting } from '../../../std/index.js';
/**
 * @see TARGET_DEFAULT_SERVER_MANAGER_SETTINGS
 */
export const TARGET_DEFAULT_SERVER_CLIENT_MANAGER_SETTINGS = {
    server_cookies_name_auth: 'auth',
    server_public_api_key: unsafeDefaultSetting(),
    server_public_api_key_header_name: 'X-API-Key',
    server_public_url: 'http://localhost:7443',
};
