import {
    appTesterFlow,
    appTesterFlowRead00,
    FAKE_USER_ADMIN,
} from '../../../../../dist/esm/index.js';
import { BuyAssetUCD } from '../../src/ucds/BuyAssetUCD.js';
import { CancelOrderUCD } from '../../src/ucds/CancelOrderUCD.js';
import { ListOrdersUCD } from '../../src/ucds/ListOrdersUCD.js';

export const flow1 = appTesterFlow({
    auth: FAKE_USER_ADMIN,
    authName: 'ADMIN',
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
