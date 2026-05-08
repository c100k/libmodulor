import { TString } from '../base/TString.js';
export class TApiKey extends TString {
    tName() {
        return 'ApiKey';
    }
    example() {
        return 'pk_bxa2HCdsT7CKwVSdem8fjS8rW';
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
