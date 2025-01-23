import { TString } from '../base/TString.js';
export class TPersonFirstname extends TString {
    static FORMAT = /^[A-Z0-9].+$/;
    constructor(constraints) {
        super({
            ...constraints,
            format: {
                f: 'PersonFirstname',
                regexp: TPersonFirstname.FORMAT,
            },
        });
    }
    tName() {
        return 'PersonFirstname';
    }
    example() {
        return 'Dexter';
    }
}
