import { Container } from 'inversify';
import {
    bindCommon,
    bindProduct,
    CONTAINER_OPTS,
    EnvSettingsManager,
    type ServerManager,
    type ServerManagerSettings,
    type SettingsManager,
    TARGET_DEFAULT_SERVER_MANAGER_SETTINGS,
    type UCDataStore,
} from 'libmodulor';
import { bindNodeCore } from 'libmodulor/node';
import { bindServer, NodeHonoServerManager } from 'libmodulor/node-hono';
import {
    KnexUCDataStore,
    type KnexUCDataStoreSettings,
} from 'libmodulor/uc-data-store-knex';

import type { AssetPriceStreamerSettings } from '../../../apps/Trading/index.js';
import { I18n } from '../i18n.js';
import { Manifest } from '../manifest.js';

type S = AssetPriceStreamerSettings &
    KnexUCDataStoreSettings &
    ServerManagerSettings;

const container = new Container(CONTAINER_OPTS);

bindCommon<S>(container, () => ({
    ...TARGET_DEFAULT_SERVER_MANAGER_SETTINGS,
    asset_price_streamer_speed: 1,
    knex_uc_data_store_conn_string: 'postgresql://toto',
    knex_uc_data_store_file_path: '../../../../uc-data-store.sqlite',
    knex_uc_data_store_pool_max: 5,
    knex_uc_data_store_pool_min: 0,
    knex_uc_data_store_type: 'sqlite3',
    server_static_dir_path: 'public',
}));
bindNodeCore(container);
bindServer(container);
bindProduct(container, Manifest, I18n);

container.rebindSync<SettingsManager>('SettingsManager').to(EnvSettingsManager);
container.rebindSync<UCDataStore>('UCDataStore').to(KnexUCDataStore);

container.bind<ServerManager>('ServerManager').to(NodeHonoServerManager);

export default container;
