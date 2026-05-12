import {
    TBoolean,
    type UCOPIBase,
    type UCOPIValue,
    type UCOutputDef,
} from '../../../../../dist/esm/index.js';
import { type AlbumDesc, TAlbumDesc } from './TAlbumDesc.js';
import { type AlbumName, TAlbumName } from './TAlbumName.js';
import {
    type AlbumReleaseYear,
    TAlbumReleaseYear,
} from './TAlbumReleaseYear.js';
import { type Artist, TArtist } from './TArtist.js';
import { type Language, TLanguage } from './TLanguage.js';
import { type Tag, TTag } from './TTag.js';

export interface AlbumOPI0 extends UCOPIBase {
    artist: UCOPIValue<Artist>;
    description: UCOPIValue<AlbumDesc>;
    isPrivate: UCOPIValue<boolean>;
    language: UCOPIValue<Language>;
    name: UCOPIValue<AlbumName>;
    releaseYear: UCOPIValue<AlbumReleaseYear>;
    tags: UCOPIValue<Tag>;
}

export const AlbumOPIDef: UCOutputDef<AlbumOPI0> = {
    parts: {
        _0: {
            fields: {
                artist: {
                    cardinality: {
                        min: 0,
                    },
                    type: new TArtist(),
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
                    type: new TBoolean(),
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
                    type: new TAlbumReleaseYear(),
                },
                tags: {
                    cardinality: {
                        max: 5,
                        min: 0,
                    },
                    type: new TTag(),
                },
            },
        },
    },
};
