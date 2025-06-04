import { injectable } from 'inversify';
import {
    type AppTesterCtx,
    type AppTesterFlow,
    bindCommon,
    type CryptoManager,
} from 'libmodulor';
import { bindNodeCore, NodeDeterministicCryptoManager } from 'libmodulor/node';
import { bindServer } from 'libmodulor/node-express';
import { SimpleAppTesterConfigurator } from 'libmodulor/node-test';

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

        (await container.rebind<CryptoManager>('CryptoManager')).to(
            NodeDeterministicCryptoManager,
        );
    }

    public override async flows(): Promise<AppTesterFlow[]> {
        return [flow1];
    }
}
