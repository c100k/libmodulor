import { TString } from '../base/TString.js';
export class TPersonFullname extends TString {
    static FORMAT = /^[A-Z0-9].+ [A-Z0-9].+$/;
    constructor(constraints) {
        super({
            ...constraints,
            format: {
                f: 'PersonFullname',
                regexp: TPersonFullname.FORMAT,
            },
        });
    }
    tName() {
        return 'PersonFullname';
    }
    example() {
        return 'Dexter Morgan';
    }
}
