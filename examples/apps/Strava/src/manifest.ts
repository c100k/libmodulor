import type { AppManifest } from '../../../../dist/esm/index.js';

export const Manifest = {
    languageCodes: ['en', 'fr'],
    name: 'Strava',
    ucReg: {
        CreateActivity: {
            action: 'Create',
            icon: 'circle-plus',
            name: 'CreateActivity',
        },
    },
} satisfies AppManifest;
