import { TString } from '../base/TString.js';
export class TColor extends TString {
    tName() {
        return 'Color';
    }
    example() {
        return '#000000';
    }
    htmlInputType() {
        return 'color';
    }
}
