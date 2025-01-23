import { TString } from '../base/TString.js';
export class TSQLQuery extends TString {
    tName() {
        return 'SQLQuery';
    }
    example() {
        return 'select id, name from users limit 10;';
    }
    isPotentiallyLong() {
        return true;
    }
}
