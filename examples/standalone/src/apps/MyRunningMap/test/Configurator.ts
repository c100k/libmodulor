import { injectable } from 'inversify';
import { type AppTesterCtx, bindCommon, type CryptoManager } from 'libmodulor';
import { bindNodeCore, NodeDeterministicCryptoManager } from 'libmodulor/node';
import { SimpleAppTesterConfigurator } from 'libmodulor/node-test';

import type { GeospatialManager } from '../src/lib/geospatial/GeospatialManager.js';
import { SimpleGeospatialManager } from '../src/lib/geospatial/SimpleGeospatialManager.js';
import { FakeLinkManager } from '../src/lib/link/FakeLinkManager.js';
import type { LinkManager } from '../src/lib/link/LinkManager.js';

@injectable()
export class Configurator extends SimpleAppTesterConfigurator {
    public override async bindImplementations(
        ctx: AppTesterCtx,
    ): Promise<void> {
        await super.bindImplementations(ctx);

        const { container } = ctx;

        bindCommon(container);
        bindNodeCore(container);

        (await container.rebind<CryptoManager>('CryptoManager')).to(
            NodeDeterministicCryptoManager,
        );

        container.bind<LinkManager>('LinkManager').to(FakeLinkManager);
        container
            .bind<GeospatialManager>('GeospatialManager')
            .to(SimpleGeospatialManager);
    }
}
