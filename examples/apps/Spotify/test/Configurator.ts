import {
    type AnyAppTesterFlow,
    type AppTesterConfiguratorSideEffects,
    type AppTesterCtx,
    type EmailManager,
    type JobManager,
    type LLMManager,
    MistralAILLMManager,
} from '../../../../dist/esm/index.js';
import { ExampleAppTesterConfigurator } from '../../../ExampleAppTesterConfigurator.js';
import type { Settings } from '../src/settings.js';
import { flow1 } from './flows/flow1.js';

export class Configurator extends ExampleAppTesterConfigurator {
    public override async bindImplementations(
        ctx: AppTesterCtx,
    ): Promise<void> {
        await super.bindImplementations(ctx);

        await this.updateSettings<Settings>(ctx, {
            spotify_admin_email: 'dexter@caramail.com',
            spotify_song_player_speed: 100,
        });

        const { container } = ctx;

        container.bind<LLMManager>('LLMManager').to(MistralAILLMManager);
    }

    public override async flows(): Promise<AnyAppTesterFlow[]> {
        return [flow1];
    }

    public override async sideEffects(
        ctx: AppTesterCtx,
    ): Promise<AppTesterConfiguratorSideEffects | undefined> {
        await super.sideEffects(ctx);

        const { container } = ctx;

        const emailsSent = await container
            .get<EmailManager>('EmailManager')
            .sideEffects();
        const jobsDispatched = await container
            .get<JobManager>('JobManager')
            .sideEffects();

        return new Map([
            ['emailsSent', emailsSent],
            ['jobsDispatched', jobsDispatched],
        ]);
    }
}
