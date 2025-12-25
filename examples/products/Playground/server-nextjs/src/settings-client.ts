import {
    type ServerClientManagerSettings,
    TARGET_DEFAULT_SERVER_CLIENT_MANAGER_SETTINGS,
} from '../../../../../dist/esm/index.js';

export type S = ServerClientManagerSettings;

export const settings: S = {
    ...TARGET_DEFAULT_SERVER_CLIENT_MANAGER_SETTINGS,
    server_public_url: 'http://localhost:3000',
};
