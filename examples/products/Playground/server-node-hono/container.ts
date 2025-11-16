import { Container } from 'inversify';

import {
    bindCommon,
    bindProduct,
    CONTAINER_OPTS,
    EnvSettingsManager,
    type LLMManager,
    MistralAILLMManager,
    type MistralAILLMManagerSettings,
    type ServerManager,
    type ServerManagerSettings,
    type SettingsManager,
    SettingsManagerMandatoryPlaceholder,
    STD_DEFAULT_JWT_MANAGER_SETTINGS,
    TARGET_DEFAULT_SERVER_MANAGER_SETTINGS,
    TPassword,
    type UCDataStore,
} from '../../../../dist/esm/index.js';
import { bindNodeCore } from '../../../../dist/esm/index.node.js';
import {
    bindServer,
    NodeHonoServerManager,
} from '../../../../dist/esm/index.node-hono.js';
import {
    KnexUCDataStore,
    type KnexUCDataStoreSettings,
} from '../../../../dist/esm/index.uc-data-store-knex.js';
import type { SongPlayerSettings } from '../../../apps/Spotify/index.js';
import type { AssetPriceStreamerSettings } from '../../../apps/Trading/index.js';
import { I18n } from '../i18n.js';
import { Manifest } from '../manifest.js';

type S = AssetPriceStreamerSettings &
    KnexUCDataStoreSettings &
    MistralAILLMManagerSettings &
    ServerManagerSettings &
    SongPlayerSettings;

const container = new Container(CONTAINER_OPTS);

bindCommon<S>(container, () => ({
    ...TARGET_DEFAULT_SERVER_MANAGER_SETTINGS,
    ...STD_DEFAULT_JWT_MANAGER_SETTINGS,
    asset_price_streamer_speed: 1,
    jwt_manager_audience: 'libmodulor-playground',
    jwt_manager_issuer: 'libmodulor-playground',
    jwt_manager_secret: new TPassword().example(), // DO NOT USE THIS IN PRODUCTION !!!
    knex_uc_data_store_conn_string: 'postgresql://toto',
    knex_uc_data_store_file_path: '../uc-data-store.sqlite',
    knex_uc_data_store_pool_max: 5,
    knex_uc_data_store_pool_min: 0,
    knex_uc_data_store_type: 'sqlite3',
    mai_api_key: SettingsManagerMandatoryPlaceholder,
    server_static_dir_path: 'public',
    song_player_speed: 1,
}));
bindNodeCore(container);
bindServer(container);
bindProduct(container, Manifest, I18n);

container.rebindSync<SettingsManager>('SettingsManager').to(EnvSettingsManager);
container.rebindSync<UCDataStore>('UCDataStore').to(KnexUCDataStore);

container.bind<LLMManager>('LLMManager').to(MistralAILLMManager);
container.bind<ServerManager>('ServerManager').to(NodeHonoServerManager);

export default container;
