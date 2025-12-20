import {
    EverybodyUCPolicy,
    type FreeTextLong,
    type FreeTextShort,
    range,
    SendClientMain,
    TBoolean,
    TFile,
    TFreeTextLong,
    TFreeTextShort,
    TYear,
    type UCDef,
    type UCInput,
    type UCInputFieldValue,
    type Year,
} from '../../../../../dist/esm/index.js';
import { AlbumOPIDef } from '../lib/album.js';
import { Manifest } from '../manifest.js';
import { CreateAlbumServerMain } from './CreateAlbumServerMain.js';
import type { ListAlbumsOPI0 } from './ListAlbumsUCD.js';

export interface CreateAlbumInput extends UCInput {
    artist: UCInputFieldValue<FreeTextShort>;
    book: UCInputFieldValue<File>;
    cover: UCInputFieldValue<File>;
    description: UCInputFieldValue<FreeTextLong>;
    isPrivate: UCInputFieldValue<boolean>;
    language: UCInputFieldValue<FreeTextShort>;
    name: UCInputFieldValue<FreeTextShort>;
    releaseYear: UCInputFieldValue<Year>;
    tags: UCInputFieldValue<FreeTextShort>;
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
                    type: new TFreeTextShort()
                        .setExamples(['Daft Punk'])
                        .setInitialValue('Daft Punk'),
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
                    type: new TFreeTextLong().setExamples([
                        'Alive 2007 is the second live album by the French electronic music duo Daft Punk, released on 19 November 2007',
                    ]),
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
                    type: new TFreeTextShort().setOptions([
                        { label: 'English', value: 'en' },
                        { label: 'Français', value: 'fr' },
                        { label: 'Italiano', value: 'it' },
                    ]),
                },
                name: {
                    type: new TFreeTextShort({ maxLength: 150 }).setExamples([
                        'Alive 2007',
                    ]),
                },
                releaseYear: {
                    cardinality: {
                        min: 0,
                    },
                    type: new TYear().setInitialValue(2012).setOptions(
                        range(2026)
                            .filter((v) => v > 1900)
                            .map((y) => ({
                                label: y.toString(),
                                value: y,
                            }))
                            .reverse(),
                    ),
                },
                tags: {
                    cardinality: {
                        max: 5,
                        min: 0,
                    },
                    type: new TFreeTextShort().setExamples([
                        'Electronic',
                        'French Touch',
                    ]),
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
