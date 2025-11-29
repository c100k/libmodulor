import type { AppManifest } from '../../../../dist/esm/index.js';

export const Manifest = {
    languageCodes: ['en'],
    name: 'Toolbox',
    ucReg: {
        DecodeJWT: {
            action: 'Create',
            icon: 'gears',
            name: 'DecodeJWT',
        },
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
        GeocodeAddress: {
            action: 'Create',
            icon: 'gear',
            name: 'GeocodeAddress',
        },
        PromptLLM: {
            action: 'Create',
            icon: 'gear',
            name: 'PromptLLM',
        },
    },
} satisfies AppManifest;
