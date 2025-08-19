import type { TName } from '../base/TBase.js';
import { TString, type TStringConstraints } from '../base/TString.js';
export type GitSSHURL = string;
export interface TGitSSHURLConstraints extends TStringConstraints<'GitSSHURL'> {
    domainName?: string | undefined;
}
export declare class TGitSSHURL extends TString<GitSSHURL> {
    private static DEFAULT_DOMAIN_NAME;
    constructor(constraints?: TGitSSHURLConstraints);
    tName(): TName;
    example(): GitSSHURL;
}
