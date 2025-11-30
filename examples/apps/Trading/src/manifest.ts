import type { AppManifest } from '../../../../dist/esm/index.js';

export const Manifest = {
    languageCodes: ['en', 'fr'],
    name: 'Trading',
    ucReg: {
        AskQuestion: {
            action: 'Search',
            icon: 'list',
            name: 'AskQuestion',
        },
        BuyAsset: {
            action: 'Create',
            icon: 'plus',
            name: 'BuyAsset',
        },
        CancelOrder: {
            action: 'Delete',
            icon: 'circle-xmark',
            name: 'CancelOrder',
            sensitive: true,
        },
        ListOrders: {
            action: 'List',
            icon: 'list',
            name: 'ListOrders',
        },
        ViewAssetPrice: {
            action: 'View',
            icon: 'money-bill-wave',
            name: 'ViewAssetPrice',
        },
    },
} satisfies AppManifest;
