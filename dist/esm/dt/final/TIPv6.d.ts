import type { TName } from '../base/TBase.js';
import { TString, type TStringConstraints } from '../base/TString.js';
import type { JSONSchemaType } from '../targets/json-schema.js';
export type IPv6 = `${string}:${string}:${string}:${string}:${string}:${string}:${string}:${string}`;
export declare class TIPv6 extends TString<IPv6> {
    static readonly FORMAT: RegExp;
    constructor(constraints?: TStringConstraints);
    tName(): TName;
    example(): IPv6;
    jsonSchemaType(): JSONSchemaType;
}
