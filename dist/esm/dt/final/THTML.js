import { TString } from '../base/TString.js';
export class THTML extends TString {
    tName() {
        return 'HTML';
    }
    example() {
        return '<p>This is a paragraph</p>';
    }
    isPotentiallyLong() {
        return true;
    }
}
