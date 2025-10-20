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
