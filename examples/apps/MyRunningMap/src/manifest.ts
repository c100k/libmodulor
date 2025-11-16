import type { AppManifest } from '../../../../dist/esm/index.js';

export const Manifest = {
    languageCodes: ['en'],
    name: 'MyRunningMap',
    ucReg: {
        AuthenticateToStravaStep1: {
            action: 'Create',
            icon: 'right-to-bracket',
            name: 'AuthenticateToStravaStep1',
        },
        AuthenticateToStravaStep2: {
            action: 'Create',
            icon: 'right-to-bracket',
            name: 'AuthenticateToStravaStep2',
        },
        GenerateRunningMapFromStrava: {
            action: 'Create',
            icon: 'map',
            name: 'GenerateRunningMapFromStrava',
        },
    },
} satisfies AppManifest;
