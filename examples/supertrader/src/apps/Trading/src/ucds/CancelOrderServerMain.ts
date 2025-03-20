import { inject, injectable } from 'inversify';
import {
    type I18nManager,
    IllegalArgumentError,
    NotFoundError,
    type UCDataStore,
    type UCMain,
    type UCMainInput,
    type UCManager,
    type UCOutput,
    UCOutputBuilder,
    type UUID,
    recIs,
    reqVal0,
} from 'libmodulor';

import type { Order } from '../lib/order.js';
import { Manifest } from '../manifest.js';
import type { BuyAssetInput } from './BuyAssetUCD.js';
import type { CancelOrderInput, CancelOrderOPI0 } from './CancelOrderUCD.js';

const { BuyAsset, CancelOrder } = Manifest.ucReg;

@injectable()
export class CancelOrderServerMain
    implements UCMain<CancelOrderInput, CancelOrderOPI0>
{
    constructor(
        @inject('I18nManager') private i18nManager: I18nManager,
        @inject('UCDataStore') private ucDataStore: UCDataStore,
        @inject('UCManager') private ucManager: UCManager,
    ) {}

    public async exec({
        uc,
    }: UCMainInput<CancelOrderInput, CancelOrderOPI0>): Promise<
        UCOutput<CancelOrderOPI0>
    > {
        const id = uc.reqVal0<UUID>('id');

        // >=> Check that the order exists
        const { records } = await this.ucDataStore.read<
            BuyAssetInput | CancelOrderInput
        >({
            filters: {
                aggregateId: id,
                name: [BuyAsset.name, CancelOrder.name],
            },
        });
        if (records.length === 0) {
            throw new NotFoundError();
        }

        let order: Order | null = null;
        for (const r of records) {
            if (recIs<BuyAssetInput>(r, BuyAsset.name)) {
                order = {
                    id,
                    isin: reqVal0(r.input?.isin),
                    limit: reqVal0(r.input?.limit),
                    qty: reqVal0(r.input?.qty),
                    status: 'pending',
                };
            } else if (recIs<CancelOrderInput>(r, CancelOrder.name) && order) {
                order.status = 'cancelled';
            }
        }
        if (!order) {
            throw new NotFoundError();
        }
        if (order.status !== 'pending') {
            throw new IllegalArgumentError(
                this.i18nManager.t('err_order_uncancellable'),
            );
        }

        // >=> Cancel the order
        await this.ucManager.persist(uc, null, { aggregateId: id });
        order.status = 'cancelled';

        return new UCOutputBuilder<CancelOrderOPI0>().add(order).get();
    }
}
