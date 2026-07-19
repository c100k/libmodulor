import type { AppTesterFlow } from '../../../../../dist/esm/index.js';
import { BuyAssetUCD } from '../../src/ucds/BuyAssetUCD.js';
import {
    type CancelOrderInput,
    CancelOrderUCD,
} from '../../src/ucds/CancelOrderUCD.js';
import { ListOrdersUCD } from '../../src/ucds/ListOrdersUCD.js';

export const flow1: AppTesterFlow = {
    name: 'Buy, List, Cancel',
    steps: [
        [BuyAssetUCD, null],
        [BuyAssetUCD, null],
        [BuyAssetUCD, null],
        [ListOrdersUCD, null],
        [
            CancelOrderUCD,
            (data): Partial<CancelOrderInput> => ({
                id: data[0]?.io.o?.parts._0.items[0].id,
            }),
        ],
        [ListOrdersUCD, null],
    ],
};
