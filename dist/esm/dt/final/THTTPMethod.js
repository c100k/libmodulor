import { TString } from '../base/TString.js';
export class THTTPMethod extends TString {
    static OPTIONS = [
        'CONNECT',
        'DELETE',
        'GET',
        'HEAD',
        'OPTIONS',
        'PATCH',
        'POST',
        'PUT',
        'TRACE',
    ];
    constructor() {
        super();
        this.setOptions(THTTPMethod.OPTIONS.map((v) => ({ label: v, value: v })));
    }
    tName() {
        return 'HTTPMethod';
    }
    example() {
        return 'GET';
    }
}
