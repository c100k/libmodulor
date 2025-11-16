import type { ProductManifest } from '../../../dist/esm/index.js';

export const Manifest = {
    appReg: [
        { name: 'Auth' },
        { name: 'Spotify' },
        { name: 'Strava' },
        { name: 'Trading' },
    ],
    name: 'Playground',
} satisfies ProductManifest;
