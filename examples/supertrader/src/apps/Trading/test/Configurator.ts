import { injectable } from 'inversify';
import {
    type AppTesterConfiguratorSpecificAssertions,
    type AppTesterCtx,
    type AppTesterFlow,
    bindCommon,
    type CryptoManager,
    type UCExecutorAssertion,
    type UCExecutorExecOutput,
} from 'libmodulor';
import { bindNodeCore, NodeDeterministicCryptoManager } from 'libmodulor/node';
import { bindServer } from 'libmodulor/node-express';
import { SimpleAppTesterConfigurator } from 'libmodulor/node-test';

import type { AssetPriceStreamerSettings } from '../src/lib/AssetPriceStreamer.js';
import type {
    ViewAssetPriceInput,
    ViewAssetPriceOPI0,
} from '../src/ucds/ViewAssetPriceUCD.js';
import { flow1 } from './flows/flow1.js';

@injectable()
export class Configurator extends SimpleAppTesterConfigurator {
    public override async bindImplementations(
        ctx: AppTesterCtx,
    ): Promise<void> {
        await super.bindImplementations(ctx);

        const { container } = ctx;

        bindCommon(container);
        bindNodeCore(container);
        bindServer(container);

        type S = AssetPriceStreamerSettings;
        const current = container.get<S>('Settings');
        const settings: S = {
            ...current,
            asset_price_streamer_speed: 100,
        };
        container.rebindSync<S>('Settings').toConstantValue(settings);

        (await container.rebind<CryptoManager>('CryptoManager')).to(
            NodeDeterministicCryptoManager,
        );
    }

    public override async flows(): Promise<AppTesterFlow[]> {
        return [flow1];
    }

    public override async specificAssertions(): Promise<
        AppTesterConfiguratorSpecificAssertions | undefined
    > {
        return new Map([
            ...[
                '4f88fa3441c68ccb858ba6a6765a4ea0f1f501f8f4d432148438846bf14de642',
                '50b1a7686ab8e2fc7fdeb1dea6e1d5f453f177c1704f7ebb2dbd20e17c5e435a',
                '234f58c93cef1d4f5674d959e510407cd4f046cf8c4a37743738432311c7b1ef',
                'dc1d6fb2af8eead2a3f731ad6f65eb6d37846be35f8b80bc8f2b54be2c2decec',
                '650588bfa30049fee19802335c846b4f5397deac9137a1b945230c9914383204',
                '6189c79befeac63f516e3d6b2d786ffefbaa40e7780da1391765cc5d55aa669d',
            ].map(
                (h) =>
                    [h, this.assertViewAssetPrice] as readonly [
                        string,
                        UCExecutorAssertion,
                    ],
            ),
        ]);
    }

    private assertViewAssetPrice(exec: UCExecutorExecOutput): boolean {
        const io = exec.io as UCExecutorExecOutput<
            ViewAssetPriceInput,
            ViewAssetPriceOPI0
        >['io'];
        // biome-ignore lint/style/noNonNullAssertion: we want it
        const { evol, price } = io.o!.parts._0.items[0]!;

        return Number.isFinite(evol) && Number.isFinite(price);
    }
}
