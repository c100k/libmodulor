import type { TName } from '../base/TBase.js';
import { TString } from '../base/TString.js';
import type { JSONSchemaType } from '../targets/json-schema.js';
import type { HTMLInputType } from '../targets/web.js';
export type Password = string;
export declare class TPassword extends TString<Password> {
    tName(): TName;
    example(): Password;
    htmlInputType(): HTMLInputType;
    jsonSchemaType(): JSONSchemaType;
    isSensitive(): boolean;
}
