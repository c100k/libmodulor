import {
    type FreeTextShort,
    TFreeTextShort,
} from '../../../../../dist/esm/index.js';

export type Language = FreeTextShort;

export class TLanguage extends TFreeTextShort {
    constructor() {
        super();
        this.setOptions([
            { label: 'English', value: 'en' },
            { label: 'Français', value: 'fr' },
            { label: 'Italiano', value: 'it' },
        ]);
    }
}
