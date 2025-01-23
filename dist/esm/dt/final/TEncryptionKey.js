import { TString } from '../base/TString.js';
export class TEncryptionKey extends TString {
    tName() {
        return 'EncryptionKey';
    }
    example() {
        return '39b65c8b58140bed54c8b9a170f378644f128744a9711ef268ce561a360eb2eee6dbd2fd1ce7a743167e0cff5d7ca13cbdd2bded2b72c58d30caed990c3e04b6';
    }
    htmlInputType() {
        return 'password';
    }
    isSensitive() {
        return true;
    }
}
