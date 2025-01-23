import type { TName } from '../base/TBase.js';
import { TString, type TStringConstraints } from '../base/TString.js';
export type GitSSHURL = string;
export declare class TGitSSHURL extends TString<GitSSHURL> {
    private static DEFAULT_DOMAIN_NAME;
    constructor(constraints?: TStringConstraints & {
        domainName: string;
    });
    tName(): TName;
    example(): GitSSHURL;
}
