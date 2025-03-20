import { inject, injectable } from 'inversify';
import {
    type UCDataStore,
    type UCMain,
    type UCMainInput,
    type UCOutput,
    UCOutputBuilder,
    recIs,
    reqVal0,
} from 'libmodulor';

import { Manifest } from '../manifest.js';
import type { BuyAssetInput } from './BuyAssetUCD.js';
import type { ListOrdersInput, ListOrdersOPI0 } from './ListOrdersUCD.js';

const { BuyAsset } = Manifest.ucReg;

@injectable()
export class ListOrdersServerMain
    implements UCMain<ListOrdersInput, ListOrdersOPI0>
{
    constructor(@inject('UCDataStore') private ucDataStore: UCDataStore) {}

    public async exec(
        _input: UCMainInput<ListOrdersInput, ListOrdersOPI0>,
    ): Promise<UCOutput<ListOrdersOPI0>> {
        // TODO : Handle pagination (limit, offset, ...) from input

        const { records } = await this.ucDataStore.read<BuyAssetInput>({
            filters: {
                name: [BuyAsset.name],
            },
        });

        const ob = new UCOutputBuilder<ListOrdersOPI0>();

        for (const r of records) {
            if (recIs<BuyAssetInput>(r, BuyAsset.name)) {
                ob.add({
                    isin: reqVal0(r.input?.isin),
                    limit: reqVal0(r.input?.limit),
                    qty: reqVal0(r.input?.qty),
                    id: r.aggregateId,
                });
            }

            // TODO : Handle the other use cases (e.g. CancelOrder would remove it or flag it as cancelled)
            // For example, CancelOrder would :
            //   - Set cancelled: boolean to true (false by default)
            //   - Set status: 'cancelled' | 'pending' to 'cancelled' ('pending' by default)
            //   - Remove it from the list
            //   - etc.
        }

        return ob.get();
    }
}
