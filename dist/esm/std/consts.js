import { SettingsManagerMandatoryPlaceholder } from './SettingsManager.js';
export const STD_DEFAULT_EMAIL_MANAGER_SETTINGS = {
    email_manager_enabled: false,
    email_manager_from: 'me@example.com',
};
export const STD_DEFAULT_JOB_MANAGER_SETTINGS = {
    job_manager_enabled: false,
    job_manager_processors: [],
};
export const STD_DEFAULT_JWT_MANAGER_SETTINGS = {
    jwt_manager_algorithm: 'HS256',
    jwt_manager_audience: SettingsManagerMandatoryPlaceholder,
    jwt_manager_expires_in: '1h',
    jwt_manager_invalidate_issued_before: null,
    jwt_manager_issuer: SettingsManagerMandatoryPlaceholder,
    jwt_manager_key_id: null,
    jwt_manager_secret: SettingsManagerMandatoryPlaceholder,
    jwt_manager_subject: null,
};
export const STD_DEFAULT_LOGGER_SETTINGS = {
    logger_level: 'debug',
};
