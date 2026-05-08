import type { TName } from '../base/TBase.js';
import { TString, type TStringConstraints } from '../base/TString.js';
import type { JSONSchemaType } from '../targets/json-schema.js';
import type { HTMLInputType } from '../targets/web.js';
type Type = 'OPENSSH' | 'RSA';
export declare const SSHPrivatekKeyTypes: Type[];
export type SSHPrivateKey = `-----BEGIN ${Type} PRIVATE KEY-----\n${string}\n-----END ${Type} PRIVATE KEY-----`;
export declare class TSSHPrivateKey extends TString<SSHPrivateKey> {
    static readonly FORMAT: RegExp;
    constructor(constraints?: TStringConstraints);
    tName(): TName;
    example(): SSHPrivateKey;
    htmlInputType(): HTMLInputType;
    jsonSchemaType(): JSONSchemaType;
    isPotentiallyLong(): boolean;
    isSensitive(): boolean;
}
export {};
