import {
    type FreeTextShort,
    TFreeTextShort,
} from '../../../../../dist/esm/index.js';

export type Tag = FreeTextShort;

export class TTag extends TFreeTextShort {
    constructor() {
        super();
        this.setExamples(['Electronic', 'French Touch']);
    }
}
