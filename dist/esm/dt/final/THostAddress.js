import { TString } from '../base/TString.js';
// TODO : Validate using IPv4, DomainName, etc. rules
// But watch out, hostname can be as simple as "localhost" as well
export class THostAddress extends TString {
    tName() {
        return 'HostAddress';
    }
    example() {
        return '123.45.67.89';
    }
}
