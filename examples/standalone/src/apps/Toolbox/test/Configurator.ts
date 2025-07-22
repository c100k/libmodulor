import { injectable } from 'inversify';
import {
    type AppTesterCtx,
    bindCommon,
    type ClockManager,
    type CryptoManager,
    type LLMManager,
} from 'libmodulor';
import { bindNodeCore, NodeDeterministicCryptoManager } from 'libmodulor/node';
import { SimpleAppTesterConfigurator } from 'libmodulor/node-test';

import { FakeGeocodingManager } from '../src/lib/geocoding/FakeGeocodingManager.js';
import type { GeocodingManager } from '../src/lib/geocoding/GeocodingManager.js';
import { FakeClockManager } from '../src/lib/std/FakeClockManager.js';
import { FakeLLMManager } from '../src/lib/std/FakeLLMManager.js';

@injectable()
export class Configurator extends SimpleAppTesterConfigurator {
    public override async bindImplementations(
        ctx: AppTesterCtx,
    ): Promise<void> {
        await super.bindImplementations(ctx);

        const { container } = ctx;

        bindCommon(container);
        bindNodeCore(container);

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
