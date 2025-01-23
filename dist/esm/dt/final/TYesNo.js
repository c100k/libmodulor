import { TString } from '../base/TString.js';
export class TYesNo extends TString {
    static OPTIONS = ['N', 'Y'];
    constructor() {
        super({
            maxLength: 1,
            minLength: 1,
        });
        this.setOptions(TYesNo.OPTIONS.map((v) => ({
            label: v,
            value: v,
        })), { shouldTranslateLabels: true });
    }
    tName() {
        return 'YesNo';
    }
    example() {
        return 'Y';
    }
}
