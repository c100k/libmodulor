import { TString } from '../base/TString.js';
export class TPersonInitials extends TString {
    static FORMAT = /^[A-Z]{2}$/;
    constructor(constraints) {
        super({
            ...constraints,
            format: {
                f: 'PersonInitials',
                regexp: TPersonInitials.FORMAT,
            },
        });
    }
    tName() {
        return 'PersonInitials';
    }
    example() {
        return 'DM';
    }
}
