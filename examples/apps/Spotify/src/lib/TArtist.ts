import {
    type FreeTextShort,
    TFreeTextShort,
} from '../../../../../dist/esm/index.js';

export type Artist = FreeTextShort;

export class TArtist extends TFreeTextShort {
    constructor() {
        super();
        this.setExamples(['Daft Punk']);
    }
}
