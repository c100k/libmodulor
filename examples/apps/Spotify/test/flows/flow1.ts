import {
    appTesterFlow,
    appTesterFlowRead00,
    appTesterFlowReadSideEffect,
    UCBuilder,
    type UCManager,
} from '../../../../../dist/esm/index.js';
import { CreateAlbumUCD } from '../../src/ucds/CreateAlbumUCD.js';
import { DeleteAlbumUCD } from '../../src/ucds/DeleteAlbumUCD.js';
import { LikeAlbumUCD } from '../../src/ucds/LikeAlbumUCD.js';
import { ListAlbumsUCD } from '../../src/ucds/ListAlbumsUCD.js';

export const flow1 = appTesterFlow({
    auth: null,
    authName: 'ANONYMOUS',
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
        [
            CreateAlbumUCD,
            (data) => ({
                // I know this is silly... it's just to show that you can reuse data from the output and the side effects
                name: `${appTesterFlowRead00(data[0]).name} ${appTesterFlowReadSideEffect(data[0], 'jobsDispatched')?.[0]?.i.jobName}`,
            }),
        ],
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
