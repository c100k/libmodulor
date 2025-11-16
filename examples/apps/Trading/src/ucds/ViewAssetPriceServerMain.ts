import { inject, injectable } from 'inversify';

import {
    type Amount,
    type CryptoManager,
    type I18nManager,
    IllegalArgumentError,
    type UCMain,
    type UCMainInput,
    type UCOutput,
    UCOutputBuilder,
} from '../../../../../dist/esm/index.js';
import { AssetPriceStreamer } from '../lib/AssetPriceStreamer.js';
import type { ISIN } from '../lib/TISIN.js';
import type {
    ViewAssetPriceInput,
    ViewAssetPriceOPI0,
} from './ViewAssetPriceUCD.js';

@injectable()
export class ViewAssetPriceServerMain
    implements UCMain<ViewAssetPriceInput, ViewAssetPriceOPI0>
{
    private static PRICES = new Map<ISIN, Amount>([
        ['US0378331005', 262.42], // https://www.google.com/finance/quote/AAPL:NASDAQ
        ['US02079K3059', 251.34], // https://www.google.com/finance/quote/GOOG:NASDAQ
        ['US67066G1040', 181.16], // https://www.google.com/finance/quote/NVDA:NASDAQ
    ]);

    constructor(
        @inject(AssetPriceStreamer)
        private assetPriceStreamer: AssetPriceStreamer,
        @inject('CryptoManager') private cryptoManager: CryptoManager,
        @inject('I18nManager') private i18nManager: I18nManager,
    ) {}

    public async exec({
        opts,
        uc,
    }: UCMainInput<ViewAssetPriceInput, ViewAssetPriceOPI0>): Promise<
        UCOutput<ViewAssetPriceOPI0>
    > {
        const isin = uc.reqVal0('isin');

        const initialPrice = ViewAssetPriceServerMain.PRICES.get(isin);
        if (!initialPrice) {
            throw new IllegalArgumentError(
                this.i18nManager.t('err_isin_price_not_found'),
            );
        }

        const id = this.cryptoManager.randomUUID();
        const ob = new UCOutputBuilder<ViewAssetPriceOPI0>().add({
            evol: 0,
            id,
            price: initialPrice,
        });

        if (opts?.stream) {
            opts.stream.onClose = async () => {
                stop();
            };
        }
        const { stop } = await this.assetPriceStreamer.exec({
            initialPrice,
            onProgress: (evol, price) => {
                opts?.stream?.onData?.(
                    ob
                        .update(id, (item) => {
                            item.evol = evol;
                            item.price = price;
                        })
                        .get(),
                );
            },
        });

        return ob.get();
    }
}
