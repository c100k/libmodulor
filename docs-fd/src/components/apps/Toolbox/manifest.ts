import type { AppManifest } from 'libmodulor';

export const Manifest = {
    languageCodes: ['en'],
    name: 'Toolbox',
    ucReg: {
        ExportAsana: {
            action: 'Create',
            icon: 'rotate',
            name: 'ExportAsana',
        },
        GenerateMiscData: {
            action: 'Create',
            icon: 'gear',
            name: 'GenerateMiscData',
        },
    },
} satisfies AppManifest;
