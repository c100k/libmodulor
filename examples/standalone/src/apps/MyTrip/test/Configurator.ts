import { injectable } from 'inversify';
import { type AppTesterCtx, bindCommon, type CryptoManager } from 'libmodulor';
import { bindNodeCore, NodeDeterministicCryptoManager } from 'libmodulor/node';
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

        (await container.rebind<CryptoManager>('CryptoManager')).to(
            NodeDeterministicCryptoManager,
        );
    }
}
