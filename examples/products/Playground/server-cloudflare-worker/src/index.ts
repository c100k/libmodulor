import type { SyncEdgeWorkerHonoServerManager } from '../../../../../dist/esm/index.cloudflare-worker-hono.js';
import {
    type AppManifest,
    type ServerManager,
    SyncEdgeWorkerInitializer,
    SyncProductUCsLoader,
    type SyncProductUCsLoaderInput,
    type UCDef,
} from '../../../../../dist/esm/index.js';
import {
    CreateAlbumUCD,
    DeleteAlbumUCD,
    LikeAlbumUCD,
    ListAlbumsUCD,
    ListStatsUCD,
    PlaySongUCD,
    Manifest as SpotifyManifest,
} from '../../../../apps/Spotify/index.js';
import {
    CreateActivityUCD,
    Manifest as StravaManifest,
} from '../../../../apps/Strava/index.js';
import container from './container.js';

const productLoader = container.get(SyncProductUCsLoader);
const serverManager = container.get<ServerManager>(
    'ServerManager',
) as SyncEdgeWorkerHonoServerManager;

const defs: SyncProductUCsLoaderInput['defs'] = new Map<
    AppManifest,
    // biome-ignore lint/suspicious/noExplicitAny: can be anything
    UCDef<any, any, any>[]
>([
    [
        SpotifyManifest,
        [
            CreateAlbumUCD,
            DeleteAlbumUCD,
            LikeAlbumUCD,
            ListAlbumsUCD,
            ListStatsUCD,
            PlaySongUCD,
        ],
    ],
    [StravaManifest, [CreateActivityUCD]],
]);
const ucs = productLoader.exec({ defs });

container.get(SyncEdgeWorkerInitializer).exec({
    ucs,
});

export default (serverManager as SyncEdgeWorkerHonoServerManager).getRuntime();
