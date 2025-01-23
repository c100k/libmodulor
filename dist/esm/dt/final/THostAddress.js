import { TString } from '../base/TString.js';
export class THostAddress extends TString {
    tName() {
        return 'HostAddress';
    }
    example() {
        return '123.45.67.89';
    }
}
