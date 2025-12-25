import type { AppTesterCtx } from '../dist/esm/index.js';
import { NodeAppTesterConfigurator } from '../dist/esm/index.node-test.js';

export class ExampleAppTesterConfigurator extends NodeAppTesterConfigurator {
    public static DEEPEST_IMPORT = '../../../../../../';

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
