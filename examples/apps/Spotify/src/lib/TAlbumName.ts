import {
    type FreeTextShort,
    TFreeTextShort,
} from '../../../../../dist/esm/index.js';

export type AlbumName = FreeTextShort;

export class TAlbumName extends TFreeTextShort {
    constructor() {
        super({ maxLength: 150 });
        this.setExamples(['Alive 2007']);
    }
}
