import type { AppManifest } from 'libmodulor';

export const Manifest = {
    languageCodes: ['en'],
    name: 'Toolbox',
    ucReg: {
        GenerateMiscData: {
            action: 'Create',
            icon: 'gear',
            name: 'GenerateMiscData',
        },
    },
} satisfies AppManifest;
