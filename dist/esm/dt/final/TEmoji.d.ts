import type { TName } from '../base/TBase.js';
import { TString } from '../base/TString.js';
export type Emoji = string;
export declare class TEmoji extends TString<Emoji> {
    tName(): TName;
    example(): Emoji;
}
