import { injectable } from 'inversify';

import {
    type AnyAppTesterFlow,
    type AppTesterCtx,
    FakeLLMManager,
    type LLMManager,
} from '../../../../dist/esm/index.js';
import { ExampleAppTesterConfigurator } from '../../../ExampleAppTesterConfigurator.js';
import type { AssetPriceStreamerSettings } from '../src/lib/AssetPriceStreamer.js';
import { flow1 } from './flows/flow1.js';

@injectable()
export class Configurator extends ExampleAppTesterConfigurator {
    public override async bindImplementations(
        ctx: AppTesterCtx,
    ): Promise<void> {
        await super.bindImplementations(ctx);

        await this.updateSettings<AssetPriceStreamerSettings>(ctx, {
            asset_price_streamer_speed: 100,
        });

        const { container } = ctx;

        container.bind<LLMManager>('LLMManager').to(FakeLLMManager);
    }

    public override async flows(): Promise<AnyAppTesterFlow[]> {
        return [flow1];
    }
}
