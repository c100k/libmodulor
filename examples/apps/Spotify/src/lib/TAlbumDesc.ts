import {
    type FreeTextLong,
    TFreeTextLong,
} from '../../../../../dist/esm/index.js';

export type AlbumDesc = FreeTextLong;

export class TAlbumDesc extends TFreeTextLong {
    constructor() {
        super();
        this.setExamples([
            'Alive 2007 is the second live album by the French electronic music duo Daft Punk, released on 19 November 2007',
        ]);
    }
}
