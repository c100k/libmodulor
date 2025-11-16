// Expose only what's necessary

export { I18n } from './src/i18n.js';
export type { AlbumOPI0 } from './src/lib/album.js';
export type { SongPlayerSettings } from './src/lib/SongPlayer.js';
export { Manifest } from './src/manifest.js';
export {
    type CreateAlbumInput,
    type CreateAlbumOPI0,
    CreateAlbumUCD,
} from './src/ucds/CreateAlbumUCD.js';
export {
    type DeleteAlbumInput,
    DeleteAlbumUCD,
} from './src/ucds/DeleteAlbumUCD.js';
export { LikeAlbumUCD } from './src/ucds/LikeAlbumUCD.js';
export {
    type ListAlbumsInput,
    type ListAlbumsOPI0,
    ListAlbumsUCD,
} from './src/ucds/ListAlbumsUCD.js';
export { ListStatsUCD } from './src/ucds/ListStatsUCD.js';
export { PlaySongUCD } from './src/ucds/PlaySongUCD.js';
