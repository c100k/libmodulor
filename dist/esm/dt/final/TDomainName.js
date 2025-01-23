import { TString } from '../base/TString.js';
export class TDomainName extends TString {
    static FORMAT = /^(([a-zA-Z0-9]([a-zA-Z0-9-]+)?([a-zA-Z0-9])?)\.)+[a-zA-Z0-9]+$/;
    constructor(constraints) {
        super({
            ...constraints,
            format: { f: 'DomainName', regexp: TDomainName.FORMAT },
        });
    }
    tName() {
        return 'DomainName';
    }
    example() {
        return 'myservice.toto.com';
    }
    htmlInputType() {
        return 'url';
    }
    rnInputMode() {
        return 'url';
    }
}
