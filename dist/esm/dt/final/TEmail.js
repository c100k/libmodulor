import { TString } from '../base/TString.js';
export class TEmail extends TString {
    // Inspired by https://github.com/jquense/yup/blob/master/src/string.ts#L19
    // Which is inspired by https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address
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
