import { TString } from '../base/TString.js';
export class TFilePath extends TString {
    static ABS_PATH = '/Users/dexter/Desktop';
    static FILE_NAME = 'picture.png';
    static FILE_SIZE = 32;
    static MIME_TYPE = 'image/png';
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
        return `${TFilePath.ABS_PATH}/${TFilePath.FILE_NAME}`;
    }
}
