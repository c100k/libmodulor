import type { AppManifest } from 'libmodulor';

export const Manifest = {
    languageCodes: ['en'],
    name: 'Trading',
    ucReg: {
        BuyAsset: {
            action: 'Create',
            icon: 'plus',
            name: 'BuyAsset',
        },
        ListOrders: {
            action: 'List',
            icon: 'list',
            name: 'ListOrders',
        },
    },
} satisfies AppManifest;
