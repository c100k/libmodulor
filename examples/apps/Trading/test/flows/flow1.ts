import {
    appTesterFlow,
    appTesterFlowRead00,
} from '../../../../../dist/esm/index.js';
import { BuyAssetUCD } from '../../src/ucds/BuyAssetUCD.js';
import { CancelOrderUCD } from '../../src/ucds/CancelOrderUCD.js';
import { ListOrdersUCD } from '../../src/ucds/ListOrdersUCD.js';

export const flow1 = appTesterFlow({
    name: 'Buy, List, Cancel',
    steps: [
        [BuyAssetUCD],
        [BuyAssetUCD],
        [BuyAssetUCD],
        [ListOrdersUCD],
        [
            CancelOrderUCD,
            (data) => ({
                id: appTesterFlowRead00(data[0]).id,
            }),
        ],
        [ListOrdersUCD],
    ],
});
