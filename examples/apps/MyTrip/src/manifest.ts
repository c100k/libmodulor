import type { AppManifest } from '../../../../dist/esm/index.js';

export const Manifest = {
    languageCodes: ['en'],
    name: 'MyTrip',
    ucReg: {
        SearchAccomodation: {
            action: 'Search',
            icon: 'magnifying-glass',
            name: 'SearchAccomodation',
        },
    },
} satisfies AppManifest;
