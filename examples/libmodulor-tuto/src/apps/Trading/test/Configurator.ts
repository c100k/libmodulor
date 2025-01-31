import { injectable } from 'inversify';
import { type AppTesterCtx, type CryptoManager, bindCommon } from 'libmodulor';
import {
    NodeDeterministicCryptoManager,
    bindNodeCore,
    bindServer,
} from 'libmodulor/node';
import { SimpleAppTesterConfigurator } from 'libmodulor/node-test';

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

        container
            .rebind<CryptoManager>('CryptoManager')
            .to(NodeDeterministicCryptoManager);
    }
}
