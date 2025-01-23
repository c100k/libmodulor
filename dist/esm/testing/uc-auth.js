import { FAKE_USER_ADMIN, FAKE_USER_REGULAR, } from '../uc/index.js';
export const DEFAULT_UC_AUTH_SETTERS = [
    'ANONYMOUS',
    'ADMIN',
    'REGULAR',
];
export function defaultUCAuthSetters() {
    return {
        ANONYMOUS: null,
        ADMIN: FAKE_USER_ADMIN,
        REGULAR: FAKE_USER_REGULAR,
    };
}
