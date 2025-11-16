import type { AppManifest } from '../../../../dist/esm/index.js';

export const Manifest = {
    languageCodes: ['en'],
    name: 'Spotify',
    ucReg: {
        CreateAlbum: {
            action: 'Create',
            icon: 'circle-plus',
            name: 'CreateAlbum',
        },
        DeleteAlbum: {
            action: 'Delete',
            icon: 'trash-can',
            name: 'DeleteAlbum',
            sensitive: true,
        },
        LikeAlbum: {
            action: 'Update',
            icon: 'circle-check',
            name: 'LikeAlbum',
        },
        ListAlbums: {
            action: 'List',
            icon: 'list',
            name: 'ListAlbums',
        },
        ListStats: {
            action: 'List',
            icon: 'list',
            name: 'ListStats',
        },
        PlaySong: {
            action: 'View',
            icon: 'eye',
            name: 'PlaySong',
        },
    },
} satisfies AppManifest;
