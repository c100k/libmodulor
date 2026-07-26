import type {
    Email,
    Settings as SettingsBase,
} from '../../../../dist/esm/index.js';

export interface Settings extends SettingsBase {
    spotify_admin_email: Email;
    spotify_song_player_speed: 1 | 100;
}
