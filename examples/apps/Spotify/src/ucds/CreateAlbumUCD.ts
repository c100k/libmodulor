import {
    EverybodyUCPolicy,
    SendClientMain,
    TBoolean,
    TFile,
    type UCDef,
    type UCInput,
    type UCInputFieldValue,
} from '../../../../../dist/esm/index.js';
import { AlbumOPIDef } from '../lib/album.js';
import { type AlbumDesc, TAlbumDesc } from '../lib/TAlbumDesc.js';
import { type AlbumName, TAlbumName } from '../lib/TAlbumName.js';
import {
    type AlbumReleaseYear,
    TAlbumReleaseYear,
} from '../lib/TAlbumReleaseYear.js';
import { type Artist, TArtist } from '../lib/TArtist.js';
import { type Language, TLanguage } from '../lib/TLanguage.js';
import { type Tag, TTag } from '../lib/TTag.js';
import { Manifest } from '../manifest.js';
import { CreateAlbumServerMain } from './CreateAlbumServerMain.js';
import type { ListAlbumsOPI0 } from './ListAlbumsUCD.js';

export interface CreateAlbumInput extends UCInput {
    artist: UCInputFieldValue<Artist>;
    book: UCInputFieldValue<File>;
    cover: UCInputFieldValue<File>;
    description: UCInputFieldValue<AlbumDesc>;
    isPrivate: UCInputFieldValue<boolean>;
    language: UCInputFieldValue<Language>;
    name: UCInputFieldValue<AlbumName>;
    releaseYear: UCInputFieldValue<AlbumReleaseYear>;
    tags: UCInputFieldValue<Tag>;
}

export type CreateAlbumOPI0 = ListAlbumsOPI0;

export const CreateAlbumUCD: UCDef<CreateAlbumInput, CreateAlbumOPI0> = {
    ext: {
        http: {
            mountAlsoAt: ['/api/v1/CreateAlbum'],
        },
    },
    io: {
        i: {
            fields: {
                artist: {
                    cardinality: {
                        min: 0,
                    },
                    type: new TArtist().setInitialValue('Daft Punk'),
                },
                book: {
                    cardinality: {
                        min: 0,
                    },
                    type: new TFile({
                        accept: ['application/pdf'],
                        maxSizeInBytes: 5 * 1024 * 1024,
                    }).withOneExample('book.pdf'),
                },
                cover: {
                    cardinality: {
                        min: 0,
                    },
                    type: new TFile({
                        accept: ['image/png', 'image/jpeg', 'image/jpg'],
                        maxSizeInBytes: 1 * 1024 * 1024,
                    }),
                },
                description: {
                    cardinality: {
                        min: 0,
                    },
                    type: new TAlbumDesc(),
                },
                isPrivate: {
                    cardinality: {
                        min: 0,
                    },
                    type: new TBoolean().setInitialValue(true),
                },
                language: {
                    cardinality: {
                        min: 0,
                    },
                    type: new TLanguage(),
                },
                name: {
                    type: new TAlbumName(),
                },
                releaseYear: {
                    cardinality: {
                        min: 0,
                    },
                    type: new TAlbumReleaseYear().setInitialValue(2007),
                },
                tags: {
                    cardinality: {
                        max: 5,
                        min: 0,
                    },
                    type: new TTag(),
                },
            },
            order: [
                'name',
                'description',
                'language',
                'releaseYear',
                'tags',
                'artist',
                'cover',
                'book',
                'isPrivate',
            ],
        },
        o: AlbumOPIDef,
    },
    lifecycle: {
        client: {
            main: SendClientMain,
            policy: EverybodyUCPolicy,
        },
        server: {
            main: CreateAlbumServerMain,
            policy: EverybodyUCPolicy,
        },
    },
    metadata: Manifest.ucReg.CreateAlbum,
};
