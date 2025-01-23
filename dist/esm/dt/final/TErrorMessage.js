import { TString } from '../base/TString.js';
export class TErrorMessage extends TString {
    tName() {
        return 'ErrorMessage';
    }
    example() {
        return 'You are not allowed to access this resource';
    }
}
