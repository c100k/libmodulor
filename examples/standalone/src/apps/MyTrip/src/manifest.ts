import type { AppManifest } from 'libmodulor';

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
