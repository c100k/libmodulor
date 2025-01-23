import type { TName } from '../base/TBase.js';
import { TString } from '../base/TString.js';
export type Markdown = string;
export declare class TMarkdown extends TString<Markdown> {
    tName(): TName;
    example(): Markdown;
    isPotentiallyLong(): boolean;
}
