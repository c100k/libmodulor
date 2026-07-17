import {
    type AppTesterConfiguratorAuthSettersConfig,
    type AppTesterConfiguratorInputFillers,
    type AppTesterConfiguratorSideEffects,
    type AppTesterCtx,
    allWithExamplesAnd,
    type DefaultUCAuthSetter,
    FAKE_USER_ADMIN,
    inputFillersForUC,
} from '../../../../dist/esm/index.js';
import { ExampleAppTesterConfigurator } from '../../../ExampleAppTesterConfigurator.js';
import type { ActivityProcessor } from '../src/lib/ActivityProcessor.js';
import { FakeActivityProcessor } from '../src/lib/FakeActivityProcessor.js';
import type { ActivityType } from '../src/lib/TActivityType.js';
import { CreateActivityUCD } from '../src/ucds/CreateActivityUCD.js';

export class Configurator extends ExampleAppTesterConfigurator {
    public override async authSettersConfig(): Promise<
        AppTesterConfiguratorAuthSettersConfig | undefined
    > {
        return {
            add: {
                VIEWER: {
                    ...FAKE_USER_ADMIN,
                    role: 'viewer',
                },
            },
            exclude: new Set<DefaultUCAuthSetter>().add('ADMIN').add('REGULAR'),
        };
    }

    public override async bindImplementations(
        ctx: AppTesterCtx,
    ): Promise<void> {
        await super.bindImplementations(ctx);

        const { container } = ctx;

        container
            .bind<ActivityProcessor>('ActivityProcessor')
            .to(FakeActivityProcessor)
            .inSingletonScope();
    }

    public override async inputFillers(): Promise<
        AppTesterConfiguratorInputFillers | undefined
    > {
        return new Map([
            inputFillersForUC(CreateActivityUCD, {
                ALL_CORRECT_BUT_BAD_TITLE: allWithExamplesAnd({
                    title: 'toto',
                }),
                // TODO : Find a way to automatically test this for types having a FORMAT or OPTIONS
                ALL_CORRECT_BUT_BAD_TYPE: allWithExamplesAnd({
                    type: 'toto' as ActivityType,
                }),
            }),
        ]);
    }

    public override async sideEffects(
        ctx: AppTesterCtx,
    ): Promise<AppTesterConfiguratorSideEffects | undefined> {
        return new Map([
            [
                'ActivityProcessor.entries',
                (
                    ctx.container.get<ActivityProcessor>(
                        'ActivityProcessor',
                    ) as FakeActivityProcessor
                ).entries,
            ],
        ]);
    }
}
