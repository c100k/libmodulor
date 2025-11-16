import {
    type AppTesterCtx,
    bindCommon,
    type CryptoManager,
    type EmailManager,
    FakeFSManager,
    FakeHTTPAPICallExecutor,
    type FormDataBuilder,
    type FSManager,
    type HTTPAPICallExecutor,
    type JobManager,
    SimpleFormDataBuilder,
} from '../dist/esm/index.js';
import {
    bindNodeCore,
    NodeDeterministicCryptoManager,
} from '../dist/esm/index.node.js';
import { bindServer } from '../dist/esm/index.node-express.js';
import { SimpleAppTesterConfigurator } from '../dist/esm/index.node-test.js';

export class ExampleAppTesterConfigurator extends SimpleAppTesterConfigurator {
    public static DEEPEST_IMPORT = '../../../../../../';

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
        (await container.rebind<FSManager>('FSManager')).to(FakeFSManager);
        (await container.rebind<FormDataBuilder>('FormDataBuilder')).to(
            SimpleFormDataBuilder,
        );
        (await container.rebind<HTTPAPICallExecutor>('HTTPAPICallExecutor')).to(
            FakeHTTPAPICallExecutor,
        );
    }

    public override async clearExecution(ctx: AppTesterCtx): Promise<void> {
        await super.clearExecution(ctx);

        const { container } = ctx;

        await container.get<EmailManager>('EmailManager').clear();
        await container.get<JobManager>('JobManager').clear();
    }

    public override async opts(): Promise<AppTesterCtx['opts']> {
        return {
            source: {
                imports: {
                    internal: {
                        maxDepth: ExampleAppTesterConfigurator.DEEPEST_IMPORT,
                    },
                },
            },
        };
    }

    public async updateSettings<S>(
        ctx: AppTesterCtx,
        settings: S,
    ): Promise<void> {
        const { container } = ctx;
        const current = container.get<S>('Settings');
        (await container.rebind<S>('Settings')).toConstantValue({
            ...current,
            ...settings,
        });
    }
}
