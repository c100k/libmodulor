import type { Validation } from '../Validation.js';
import type { TName } from '../base/TBase.js';
import { TString } from '../base/TString.js';
import type { HTMLInputType } from '../targets/web.js';
export type JWT = string;
export declare class TJWT extends TString<JWT> {
    tName(): TName;
    example(): JWT;
    htmlInputType(): HTMLInputType;
    isSensitive(): boolean;
    validate(): Validation;
}
