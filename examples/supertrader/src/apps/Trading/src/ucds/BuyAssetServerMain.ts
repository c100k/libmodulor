import { inject, injectable } from 'inversify';
import {
    type Amount,
    type UCMain,
    type UCMainInput,
    type UCManager,
    type UCOutput,
    UCOutputBuilder,
    type UIntQuantity,
} from 'libmodulor';

import type { ISIN } from '../lib/TISIN.js';
import type { BuyAssetInput, BuyAssetOPI0 } from './BuyAssetUCD.js';

@injectable()
export class BuyAssetServerMain implements UCMain<BuyAssetInput, BuyAssetOPI0> {
    constructor(@inject('UCManager') private ucManager: UCManager) {}

    public async exec({
        uc,
    }: UCMainInput<BuyAssetInput, BuyAssetOPI0>): Promise<
        UCOutput<BuyAssetOPI0>
    > {
        const isin = uc.reqVal0<ISIN>('isin');
        const limit = uc.reqVal0<Amount>('limit');
        const qty = uc.reqVal0<UIntQuantity>('qty');

        // >=> Persist the order
        const { aggregateId } = await this.ucManager.persist(uc);

        // >=> TODO : Check the user has enough funds to place the order

        // >=> TODO : Send the order to a queue for processing

        return new UCOutputBuilder<BuyAssetOPI0>()
            .add({
                isin,
                id: aggregateId,
                limit,
                qty,
            })
            .get();
    }
}
