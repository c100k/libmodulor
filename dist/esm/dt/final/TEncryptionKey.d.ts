import type { TName } from '../base/TBase.js';
import { TString } from '../base/TString.js';
import type { HTMLInputType } from '../targets/web.js';
export type EncryptionKey = string;
export declare class TEncryptionKey extends TString<EncryptionKey> {
    tName(): TName;
    example(): EncryptionKey;
    htmlInputType(): HTMLInputType;
    isSensitive(): boolean;
}
