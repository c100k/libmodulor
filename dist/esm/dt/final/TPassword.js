import { TString } from '../base/TString.js';
export class TPassword extends TString {
    tName() {
        return 'Password';
    }
    example() {
        return 'fmUUNWXazWH4';
    }
    htmlInputType() {
        return 'password';
    }
    jsonSchemaType() {
        return { format: 'password', type: 'string' };
    }
    isSensitive() {
        return true;
    }
}
