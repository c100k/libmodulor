import { TString } from '../base/TString.js';
export class TFilePath extends TString {
    static FORMAT = /^[a-z0-9_/.][a-z0-9-_/.]+/i;
    constructor(constraints) {
        super({
            ...constraints,
            format: { f: 'FilePath', regexp: TFilePath.FORMAT },
        });
    }
    tName() {
        return 'FilePath';
    }
    example() {
        return '/Users/dexter/Desktop/picture.png';
    }
}
