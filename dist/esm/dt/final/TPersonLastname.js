import { TString } from '../base/TString.js';
export class TPersonLastname extends TString {
    static FORMAT = /^[A-Z0-9].+$/;
    constructor(constraints) {
        super({
            ...constraints,
            format: {
                f: 'PersonLastname',
                regexp: TPersonLastname.FORMAT,
            },
        });
    }
    tName() {
        return 'PersonLastname';
    }
    example() {
        return 'Morgan';
    }
}
