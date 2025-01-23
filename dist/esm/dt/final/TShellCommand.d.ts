import type { TName } from '../base/TBase.js';
import { TString } from '../base/TString.js';
export type ShellCommand = string;
export declare class TShellCommand extends TString<ShellCommand> {
    tName(): TName;
    example(): ShellCommand;
    isPotentiallyLong(): boolean;
}
