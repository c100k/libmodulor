import { TString } from '../base/TString.js';
export class TFileMimeType extends TString {
    constructor(constraints) {
        super(constraints);
        if (constraints?.allowed) {
            this.setOptions(constraints?.allowed.map((v) => ({ label: v, value: v })));
        }
    }
    tName() {
        return 'FileMimeType';
    }
    example() {
        return 'image/png';
    }
}
