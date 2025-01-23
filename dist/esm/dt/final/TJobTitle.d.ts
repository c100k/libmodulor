import type { TName } from '../base/TBase.js';
import { TString } from '../base/TString.js';
export type JobTitle = string;
export declare class TJobTitle extends TString<JobTitle> {
    tName(): TName;
    example(): JobTitle;
}
