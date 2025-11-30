import type { AppManifest } from '../../../../dist/esm/index.js';

export const Manifest = {
    languageCodes: ['de', 'en', 'es', 'fr'],
    name: 'Auth',
    ucReg: {
        SignIn: {
            action: 'Create',
            icon: 'right-to-bracket',
            name: 'SignIn',
        },
        SignOut: {
            action: 'Delete',
            icon: 'circle-xmark',
            name: 'SignOut',
            sensitive: true,
        },
    },
} satisfies AppManifest;
