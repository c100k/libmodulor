import {
    type AnyAppTesterFlow,
    type AppTesterCtx,
    appTesterFlow,
    appTesterFlowRead00,
    type LLMManager,
    MistralAILLMManager,
    UCBuilder,
    type UCManager,
} from '../../../../dist/esm/index.js';
import { ExampleAppTesterConfigurator } from '../../../ExampleAppTesterConfigurator.js';
import type { SongPlayerSettings } from '../src/lib/SongPlayer.js';
import { CreateAlbumUCD } from '../src/ucds/CreateAlbumUCD.js';
import { DeleteAlbumUCD } from '../src/ucds/DeleteAlbumUCD.js';
import { LikeAlbumUCD } from '../src/ucds/LikeAlbumUCD.js';
import { ListAlbumsUCD } from '../src/ucds/ListAlbumsUCD.js';

export class Configurator extends ExampleAppTesterConfigurator {
    public override async bindImplementations(
        ctx: AppTesterCtx,
    ): Promise<void> {
        await super.bindImplementations(ctx);

        await this.updateSettings<SongPlayerSettings>(ctx, {
            song_player_speed: 100,
        });

        const { container } = ctx;

        container.bind<LLMManager>('LLMManager').to(MistralAILLMManager);
    }

    public override async flows(): Promise<AnyAppTesterFlow[]> {
        const flow1 = appTesterFlow({
            name: 'Create album, list, like and delete it',
            setup: async (ctx) => {
                const { appManifest, container } = ctx;

                const ucb = container.get(UCBuilder);
                const ucm = container.get<UCManager>('UCManager');
                const uc = ucb
                    .exec({ appManifest, auth: null, def: CreateAlbumUCD })
                    .fill({
                        name: 'Random Access Memories',
                        tags: ['Electronic', 'French Touch'],
                    });
                await ucm.persist(uc);
            },
            steps: [
                [CreateAlbumUCD],
                [ListAlbumsUCD],
                [
                    LikeAlbumUCD,
                    (data) => ({
                        id: appTesterFlowRead00(data[0]).id,
                    }),
                ],
                [
                    DeleteAlbumUCD,
                    (data) => ({
                        id: appTesterFlowRead00(data[0]).id,
                    }),
                ],
            ],
        });

        return [flow1];
    }
}
