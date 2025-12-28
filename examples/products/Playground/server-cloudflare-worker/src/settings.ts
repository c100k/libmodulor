import type { SyncEdgeWorkerHonoServerManagerSettings } from '../../../../../dist/esm/index.cloudflare-worker-hono.js';
import {
    type JWTManagerSettings,
    type ServerManagerSettings,
    STD_DEFAULT_JWT_MANAGER_SETTINGS,
    TARGET_DEFAULT_SERVER_MANAGER_SETTINGS,
} from '../../../../../dist/esm/index.js';
import type { SongPlayerSettings } from '../../../../apps/Spotify/index.js';
import type { AssetPriceStreamerSettings } from '../../../../apps/Trading/index.js';

export type S = AssetPriceStreamerSettings &
    JWTManagerSettings &
    ServerManagerSettings &
    SongPlayerSettings &
    SyncEdgeWorkerHonoServerManagerSettings;

export const settings: S = {
    ...TARGET_DEFAULT_SERVER_MANAGER_SETTINGS,
    ...STD_DEFAULT_JWT_MANAGER_SETTINGS,
    asset_price_streamer_speed: 1,
    sewhsm_bindings_uc_data_store: 'UCDataStore',
    song_player_speed: 1,
};
