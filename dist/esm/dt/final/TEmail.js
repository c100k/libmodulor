import { TString } from '../base/TString.js';
export class TEmail extends TString {
    static FORMAT = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    constructor(constraints) {
        super({
            ...constraints,
            format: { f: 'Email', regexp: TEmail.FORMAT },
        });
    }
    tName() {
        return 'Email';
    }
    example() {
        return 'dexter@caramail.com';
    }
    htmlInputType() {
        return 'email';
    }
    rnInputMode() {
        return 'email';
    }
}
