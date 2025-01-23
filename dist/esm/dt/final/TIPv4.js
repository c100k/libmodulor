import { TString } from '../base/TString.js';
export class TIPv4 extends TString {
    static FORMAT = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    constructor(constraints) {
        super({
            ...constraints,
            format: { f: 'IPv4', regexp: TIPv4.FORMAT },
        });
    }
    tName() {
        return 'IPv4';
    }
    example() {
        return '255.255.255.255';
    }
}
