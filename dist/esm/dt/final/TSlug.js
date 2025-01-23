import { TString } from '../base/TString.js';
export class TSlug extends TString {
    static FORMAT = /^[a-z0-9-]+$/;
    constructor(constraints) {
        super({
            ...constraints,
            format: { f: 'Slug', regexp: TSlug.FORMAT },
        });
    }
    tName() {
        return 'Slug';
    }
    example() {
        return 'title-of-seo-friendly-article';
    }
}
