import { injectable } from 'inversify';

import {
    type AppTesterCtx,
    type ClockManager,
    type CryptoManager,
    FakeClockManager,
    FakeLLMManager,
    type LLMManager,
} from '../../../../dist/esm/index.js';
import { NodeDeterministicCryptoManager } from '../../../../dist/esm/index.node.js';
import { ExampleAppTesterConfigurator } from '../../../ExampleAppTesterConfigurator.js';
import { FakeGeocodingManager } from '../src/lib/geocoding/FakeGeocodingManager.js';
import type { GeocodingManager } from '../src/lib/geocoding/GeocodingManager.js';

@injectable()
export class Configurator extends ExampleAppTesterConfigurator {
    public override async bindImplementations(
        ctx: AppTesterCtx,
    ): Promise<void> {
        await super.bindImplementations(ctx);

        const { container } = ctx;

        (await container.rebind<ClockManager>('ClockManager')).to(
            FakeClockManager,
        );
        (await container.rebind<CryptoManager>('CryptoManager')).to(
            NodeDeterministicCryptoManager,
        );

        container
            .bind<GeocodingManager>('GeocodingManager')
            .to(FakeGeocodingManager);
        container.bind<LLMManager>('LLMManager').to(FakeLLMManager);
    }
}
