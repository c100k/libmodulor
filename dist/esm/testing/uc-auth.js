import { FAKE_USER_ADMIN, FAKE_USER_REGULAR, } from '../uc/index.js';
export const DEFAULT_UC_AUTH_SETTERS = [
    'ANONYMOUS',
    'ADMIN',
    'REGULAR',
];
export function defaultUCAuthSetters() {
    return {
        ADMIN: FAKE_USER_ADMIN,
        ANONYMOUS: null,
        REGULAR: FAKE_USER_REGULAR,
    };
}
