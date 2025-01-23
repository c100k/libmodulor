import { TString } from '../base/TString.js';
export class TJavaScript extends TString {
    tName() {
        return 'JavaScript';
    }
    example() {
        return '(()=>{})();';
    }
    isPotentiallyLong() {
        return true;
    }
}
