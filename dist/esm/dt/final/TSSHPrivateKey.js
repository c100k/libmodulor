import { TString } from '../base/TString.js';
export const SSHPrivatekKeyTypes = ['OPENSSH', 'RSA'];
export class TSSHPrivateKey extends TString {
    static FORMAT = /^-----BEGIN (OPENSSH|RSA) PRIVATE KEY-----\n(.+)?\n-----END (OPENSSH|RSA) PRIVATE KEY-----$/is;
    constructor(constraints) {
        super({
            ...constraints,
            format: { f: 'SSHPrivateKey', regexp: TSSHPrivateKey.FORMAT },
        });
    }
    tName() {
        return 'SSHPrivateKey';
    }
    example() {
        return '-----BEGIN RSA PRIVATE KEY-----\nfhdsjkdsFDSFDSfgjfkhdsjf\n-----END RSA PRIVATE KEY-----';
    }
    htmlInputType() {
        return 'password';
    }
    isPotentiallyLong() {
        return true;
    }
    isSensitive() {
        return true;
    }
}
