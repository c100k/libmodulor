import { Container } from 'inversify';

import {
    bindCloudflareWorker,
    bindServer,
    CloudflareD1UCDataStore,
    SyncEdgeWorkerHonoServerManager,
    type SyncEdgeWorkerHonoServerManagerSettings,
} from '../../../../../dist/esm/index.cloudflare-worker-hono.js';
import {
    bindCommon,
    bindProduct,
    CONTAINER_OPTS,
    type LLMManager,
    MistralAILLMManager,
    type ServerManager,
    type ServerManagerSettings,
    STD_DEFAULT_JWT_MANAGER_SETTINGS,
    TARGET_DEFAULT_SERVER_MANAGER_SETTINGS,
    TPassword,
    type UCDataStore,
} from '../../../../../dist/esm/index.js';
import type { SongPlayerSettings } from '../../../../apps/Spotify/index.js';
import type { AssetPriceStreamerSettings } from '../../../../apps/Trading/index.js';
import { I18n } from '../../i18n.js';
import { Manifest } from '../../manifest.js';

type S = AssetPriceStreamerSettings &
    ServerManagerSettings &
    SongPlayerSettings &
    SyncEdgeWorkerHonoServerManagerSettings;

const container = new Container(CONTAINER_OPTS);

bindCommon<S>(container, () => ({
    ...TARGET_DEFAULT_SERVER_MANAGER_SETTINGS,
    ...STD_DEFAULT_JWT_MANAGER_SETTINGS,
    asset_price_streamer_speed: 1,
    jwt_manager_audience: 'libmodulor-playground',
    jwt_manager_issuer: 'libmodulor-playground',
    jwt_manager_secret: new TPassword().example(), // DO NOT USE THIS IN PRODUCTION !!!
    sewhsm_bindings_uc_data_store: 'UCDataStore',
    song_player_speed: 1,
}));
bindCloudflareWorker(container);
bindServer(container);
bindProduct(container, Manifest, I18n);

container
    .rebindSync<UCDataStore>('UCDataStore')
    .to(CloudflareD1UCDataStore)
    .inSingletonScope();

container.bind<LLMManager>('LLMManager').to(MistralAILLMManager);
container
    .bind<ServerManager>('ServerManager')
    .to(SyncEdgeWorkerHonoServerManager)
    .inSingletonScope();

export default container;
