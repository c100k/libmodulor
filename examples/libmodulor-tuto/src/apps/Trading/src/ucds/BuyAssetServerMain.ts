import { inject, injectable } from 'inversify';
import {
    type UCMain,
    type UCMainInput,
    type UCManager,
    type UCOutput,
    UCOutputBuilder,
} from 'libmodulor';

import type { BuyAssetInput, BuyAssetOPI0 } from './BuyAssetUCD.js';

@injectable()
export class BuyAssetServerMain implements UCMain<BuyAssetInput, BuyAssetOPI0> {
    constructor(@inject('UCManager') private ucManager: UCManager) {}

    public async exec({
        uc,
    }: UCMainInput<BuyAssetInput, BuyAssetOPI0>): Promise<
        UCOutput<BuyAssetOPI0>
    > {
        // >=> Persist the order
        const { aggregateId } = await this.ucManager.persist(uc);

        // >=> TODO : Check the user has enough funds to place the order

        // >=> TODO : Send the order to a queue for processing
        const executedDirectly: BuyAssetOPI0['executedDirectly'] = false;

        return new UCOutputBuilder<BuyAssetOPI0>()
            .add({
                executedDirectly,
                id: aggregateId,
            })
            .get();
    }
}
