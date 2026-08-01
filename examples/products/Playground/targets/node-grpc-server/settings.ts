import {
    type JWTManagerSettings,
    type MistralAILLMManagerSettings,
    type ServerManagerSettings,
    STD_DEFAULT_JWT_MANAGER_SETTINGS,
    TARGET_DEFAULT_SERVER_MANAGER_SETTINGS,
    type UCSettings,
    unsafeDefaultSetting,
} from '../../../../../dist/esm/index.js';
import type { GRPCServerManagerSettings } from '../../../../../dist/esm/index.node-grpc.js';
import type { KnexUCDataStoreSettings } from '../../../../../dist/esm/index.uc-data-store-knex.js';
import type { Settings as SpotifySettings } from '../../../../apps/Spotify/index.js';
import type { AssetPriceStreamerSettings } from '../../../../apps/Trading/index.js';
import { DEFAULT_SERVER_SETTINGS } from '../../lib/server-shared.js';

export type S = AssetPriceStreamerSettings &
    Pick<GRPCServerManagerSettings, 'server_grpc_expose_reflection'> &
    JWTManagerSettings &
    KnexUCDataStoreSettings &
    MistralAILLMManagerSettings &
    ServerManagerSettings &
    SpotifySettings &
    Pick<UCSettings, 'uc_data_store_mode'>;

export const settings: S = {
    ...TARGET_DEFAULT_SERVER_MANAGER_SETTINGS,
    ...STD_DEFAULT_JWT_MANAGER_SETTINGS,
    ...DEFAULT_SERVER_SETTINGS,
    asset_price_streamer_speed: 1,
    knex_uc_data_store_conn_string: 'postgresql://toto',
    knex_uc_data_store_file_path: '../uc-data-store.sqlite',
    knex_uc_data_store_pool_max: 5,
    knex_uc_data_store_pool_min: 0,
    knex_uc_data_store_type: 'sqlite3',
    mai_api_key: unsafeDefaultSetting(),
    server_expose_mcp: false,
    server_expose_openapi_spec: false,
    server_grpc_expose_reflection: true,
    server_mcp_dangerously_skip_auth_check: false,
    server_mcp_dangerously_skip_pub_api_key_check: false,
    spotify_admin_email: 'dexter@caramail.com',
    spotify_song_player_speed: 1,
    uc_data_store_mode: 'READ_WRITE',
};
