import { TString } from '../base/TString.js';
export class TPassword extends TString {
    tName() {
        return 'Password';
    }
    example() {
        return 'fmUUNWXazWH4';
    }
    htmlInputType() {
        return 'password';
    }
    isSensitive() {
        return true;
    }
}
