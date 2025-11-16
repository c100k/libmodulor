import { inject, injectable } from 'inversify';

import type {
    Amount,
    Configurable,
    Settings,
    SettingsManager,
    Worker,
} from '../../../../../dist/esm/index.js';

interface I {
    initialPrice: Amount;
    onProgress: (evol: Amount, price: Amount) => void;
}

interface O {
    stop: () => void;
}

export interface AssetPriceStreamerSettings extends Settings {
    asset_price_streamer_speed: 1 | 100;
}

type S = AssetPriceStreamerSettings;

@injectable()
export class AssetPriceStreamer
    implements Configurable<S>, Worker<I, Promise<O>>
{
    constructor(
        @inject('SettingsManager') private settingsManager: SettingsManager<S>,
    ) {}

    public s(): AssetPriceStreamerSettings {
        return {
            asset_price_streamer_speed: this.settingsManager.get()(
                'asset_price_streamer_speed',
            ),
        };
    }

    public async exec({ initialPrice, onProgress }: I): Promise<O> {
        let price = initialPrice;

        const intervalID = setInterval(() => {
            const rand = Math.random();
            const way = rand < 0.5 ? -1 : 1;
            const evol = way * rand;
            price = price + evol;
            onProgress(evol, price);
        }, 1000 / this.s().asset_price_streamer_speed);

        return {
            stop: () => clearInterval(intervalID),
        };
    }
}
