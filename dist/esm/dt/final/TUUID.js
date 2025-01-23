import { TString } from '../base/TString.js';
export class TUUID extends TString {
    static FORMAT = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
    constructor(constraints) {
        super({
            ...constraints,
            format: { f: 'UUID', regexp: TUUID.FORMAT },
        });
    }
    tName() {
        return 'UUID';
    }
    example() {
        return 'dd9670e7-1dd5-4155-85c2-335714799ff7';
    }
}
