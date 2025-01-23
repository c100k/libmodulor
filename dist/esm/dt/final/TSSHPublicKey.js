import { TString } from '../base/TString.js';
export const SSHPublickKeyTypes = [
    'dsa',
    'ecdsa',
    'ecdsa-sk',
    'ed25519',
    'ed25519-sk',
    'rsa',
];
export class TSSHPublicKey extends TString {
    static FORMAT = /^ssh-(dsa|ecdsa|ecdsa-sk|ed25519|ed25519-sk|rsa) (.+)$/i;
    constructor(constraints) {
        super({
            ...constraints,
            format: { f: 'SSHPublicKey', regexp: TSSHPublicKey.FORMAT },
        });
    }
    tName() {
        return 'SSHPublicKey';
    }
    example() {
        return 'ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIG1G1clVyaD6+RGzzPAbyHEiRZQ/+xkSXblmZIOHgY7E';
    }
    isPotentiallyLong() {
        return true;
    }
}
