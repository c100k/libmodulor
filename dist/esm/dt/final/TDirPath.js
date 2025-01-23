import { TString } from '../base/TString.js';
export class TDirPath extends TString {
    static FORMAT = /^[a-z0-9_/.][a-z0-9-_/.]+/i;
    constructor(constraints) {
        super({
            ...constraints,
            format: { f: 'DirPath', regexp: TDirPath.FORMAT },
        });
    }
    tName() {
        return 'DirPath';
    }
    example() {
        return '/Users/dexter/Desktop';
    }
}
