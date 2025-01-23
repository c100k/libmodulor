import type { TName } from '../base/TBase.js';
import { TString, type TStringConstraints } from '../base/TString.js';
type Type = 'dsa' | 'ecdsa' | 'ecdsa-sk' | 'ed25519' | 'ed25519-sk' | 'rsa';
export declare const SSHPublickKeyTypes: Type[];
export type SSHPublicKey = `ssh-${Type} ${string}`;
export declare class TSSHPublicKey extends TString<SSHPublicKey> {
    static readonly FORMAT: RegExp;
    constructor(constraints?: TStringConstraints);
    tName(): TName;
    example(): SSHPublicKey;
    isPotentiallyLong(): boolean;
}
export {};
