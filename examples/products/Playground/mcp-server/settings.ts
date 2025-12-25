import {
    type LoggerSettings,
    type ServerManagerSettings,
    TARGET_DEFAULT_SERVER_MANAGER_SETTINGS,
} from '../../../../dist/esm/index.js';

export type S = LoggerSettings & ServerManagerSettings;

export const settings: S = {
    ...TARGET_DEFAULT_SERVER_MANAGER_SETTINGS,
    logger_level: 'error',
};
