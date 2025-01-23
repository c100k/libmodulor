import { TString } from '../base/TString.js';
export class THTTPContentType extends TString {
    static OPTIONS = [
        'application/json',
        'application/x-www-form-urlencoded',
        'multipart/form-data',
        'text/html',
        'text/plain',
    ];
    constructor() {
        super();
        this.setOptions(THTTPContentType.OPTIONS.map((v) => ({ label: v, value: v })));
    }
    tName() {
        return 'HTTPContentType';
    }
    example() {
        return 'application/json';
    }
}
