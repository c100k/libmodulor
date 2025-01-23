import { TPersonFirstname, TPersonInitials, TUUID } from '../../dt/index.js';
export const FAKE_USER_ADMIN = {
    organization: {
        id: new TUUID().example(),
    },
    role: 'admin',
    user: {
        firstname: new TPersonFirstname().example(),
        id: new TUUID().example(),
        initials: new TPersonInitials().example(),
    },
};
export const FAKE_USER_REGULAR = {
    ...FAKE_USER_ADMIN,
    role: 'regular',
};
