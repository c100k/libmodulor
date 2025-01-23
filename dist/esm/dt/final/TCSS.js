import { TString } from '../base/TString.js';
export class TCSS extends TString {
    tName() {
        return 'CSS';
    }
    example() {
        return 'body { font-size: 30px; }';
    }
    isPotentiallyLong() {
        return true;
    }
}
