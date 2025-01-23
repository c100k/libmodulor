import type { TName } from '../base/TBase.js';
import { TString } from '../base/TString.js';
import type { HTMLInputType } from '../targets/web.js';
export type ApiKey = string;
export declare class TApiKey extends TString<ApiKey> {
    tName(): TName;
    example(): ApiKey;
    htmlInputType(): HTMLInputType;
    isSensitive(): boolean;
}
