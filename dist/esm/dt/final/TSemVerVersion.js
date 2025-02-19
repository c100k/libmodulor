import { TString } from '../base/TString.js';
// TODO : Add basic syntax validation (without adding any dependencies)
export class TSemVerVersion extends TString {
    static FORMAT = /^([0-9]+)\.([0-9]+)\.([0-9]+)$/;
    constructor(constraints) {
        super({
            ...constraints,
            format: {
                f: 'SemVerVersion',
                regexp: TSemVerVersion.FORMAT,
            },
        });
    }
    tName() {
        return 'SemVerVersion';
    }
    example() {
        return '1.2.3';
    }
}
