import {
    type JWTManagerSettings,
    type ServerManagerSettings,
    STD_DEFAULT_JWT_MANAGER_SETTINGS,
    TARGET_DEFAULT_SERVER_MANAGER_SETTINGS,
    TPassword,
} from '../../../../../dist/esm/index.js';
import type { KnexUCDataStoreSettings } from '../../../../../dist/esm/index.uc-data-store-knex.js';
import type { SongPlayerSettings } from '../../../../apps/Spotify/index.js';
import type { AssetPriceStreamerSettings } from '../../../../apps/Trading/index.js';

export type S = AssetPriceStreamerSettings &
    JWTManagerSettings &
    KnexUCDataStoreSettings &
    ServerManagerSettings &
    SongPlayerSettings;

export const settings: S = {
    ...TARGET_DEFAULT_SERVER_MANAGER_SETTINGS,
    ...STD_DEFAULT_JWT_MANAGER_SETTINGS,
    asset_price_streamer_speed: 1,
    jwt_manager_audience: 'fik-sdk-playground',
    jwt_manager_issuer: 'fik-sdk-playground',
    jwt_manager_secret: new TPassword().example(), // DO NOT USE THIS IN PRODUCTION !!!
    knex_uc_data_store_conn_string: 'postgresql://toto',
    knex_uc_data_store_file_path: '../uc-data-store.sqlite',
    knex_uc_data_store_pool_max: 5,
    knex_uc_data_store_pool_min: 0,
    knex_uc_data_store_type: 'sqlite3',
    song_player_speed: 1,
};
