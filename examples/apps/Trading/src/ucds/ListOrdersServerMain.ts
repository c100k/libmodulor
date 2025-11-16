import { inject, injectable } from 'inversify';

import {
    recIs,
    reqVal0,
    type UCDataStore,
    type UCMain,
    type UCMainInput,
    type UCOutput,
    UCOutputBuilder,
} from '../../../../../dist/esm/index.js';
import { Manifest } from '../manifest.js';
import type { BuyAssetInput } from './BuyAssetUCD.js';
import type { CancelOrderInput } from './CancelOrderUCD.js';
import type { ListOrdersInput, ListOrdersOPI0 } from './ListOrdersUCD.js';

const { BuyAsset, CancelOrder } = Manifest.ucReg;

@injectable()
export class ListOrdersServerMain
    implements UCMain<ListOrdersInput, ListOrdersOPI0>
{
    constructor(@inject('UCDataStore') private ucDataStore: UCDataStore) {}

    public async exec(
        _input: UCMainInput<ListOrdersInput, ListOrdersOPI0>,
    ): Promise<UCOutput<ListOrdersOPI0>> {
        // TODO : Handle pagination (limit, offset, ...) from input

        const { records } = await this.ucDataStore.read<
            BuyAssetInput | CancelOrderInput
        >({
            filters: {
                name: [BuyAsset.name, CancelOrder.name],
            },
        });

        const ob = new UCOutputBuilder<ListOrdersOPI0>();

        for (const r of records) {
            if (recIs<BuyAssetInput>(r, BuyAsset.name)) {
                ob.add({
                    id: r.aggregateId,
                    isin: reqVal0(r.input?.isin),
                    limit: reqVal0(r.input?.limit),
                    qty: reqVal0(r.input?.qty),
                    status: 'pending',
                });
            } else if (recIs<CancelOrderInput>(r, CancelOrder.name)) {
                ob.update(r.aggregateId, (item) => {
                    item.status = 'cancelled';
                });
            }
        }

        return ob.get();
    }
}
