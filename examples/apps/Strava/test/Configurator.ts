import {
    type AppTesterConfiguratorAuthSettersConfig,
    type AppTesterConfiguratorInputFillers,
    type AppTesterConfiguratorSideEffects,
    type AppTesterCtx,
    allWithExamples,
    type DefaultUCAuthSetter,
    FAKE_USER_ADMIN,
    type UC,
} from '../../../../dist/esm/index.js';
import { ExampleAppTesterConfigurator } from '../../../ExampleAppTesterConfigurator.js';
import type { ActivityProcessor } from '../src/lib/ActivityProcessor.js';
import { FakeActivityProcessor } from '../src/lib/FakeActivityProcessor.js';
import type { ActivityType } from '../src/lib/TActivityType.js';
import { Manifest } from '../src/manifest.js';
import type {
    CreateActivityInput,
    CreateActivityOPI0,
} from '../src/ucds/CreateActivityUCD.js';

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
            [
                Manifest.ucReg.CreateActivity.name,
                {
                    ALL_CORRECT_BUT_BAD_TITLE: (
                        uc: UC<CreateActivityInput, CreateActivityOPI0>,
                    ): void => {
                        allWithExamples(uc);
                        uc.inputField('title').setVal('toto');
                    },
                    // TODO : Find a way to automatically test this for types having a FORMAT or OPTIONS
                    ALL_CORRECT_BUT_BAD_TYPE: (
                        uc: UC<CreateActivityInput, CreateActivityOPI0>,
                    ): void => {
                        allWithExamples(uc);
                        uc.inputField('type').setVal('toto' as ActivityType);
                    },
                },
            ],
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
