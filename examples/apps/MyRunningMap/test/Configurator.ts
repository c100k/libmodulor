import { injectable } from 'inversify';

import type { AppTesterCtx } from '../../../../dist/esm/index.js';
import { ExampleAppTesterConfigurator } from '../../../ExampleAppTesterConfigurator.js';
import type { GeospatialManager } from '../src/lib/geospatial/GeospatialManager.js';
import { SimpleGeospatialManager } from '../src/lib/geospatial/SimpleGeospatialManager.js';
import { FakeLinkManager } from '../src/lib/link/FakeLinkManager.js';
import type { LinkManager } from '../src/lib/link/LinkManager.js';

@injectable()
export class Configurator extends ExampleAppTesterConfigurator {
    public override async bindImplementations(
        ctx: AppTesterCtx,
    ): Promise<void> {
        await super.bindImplementations(ctx);

        const { container } = ctx;

        container.bind<LinkManager>('LinkManager').to(FakeLinkManager);
        container
            .bind<GeospatialManager>('GeospatialManager')
            .to(SimpleGeospatialManager);
    }
}
