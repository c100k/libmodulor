import { TString } from '../base/TString.js';
export class TGitSSHURL extends TString {
    static DEFAULT_DOMAIN_NAME = 'github.com';
    constructor(constraints) {
        const format = new RegExp(`^git@${constraints?.domainName ?? TGitSSHURL.DEFAULT_DOMAIN_NAME}:([A-Za-z0-9-_]+)\/([A-Za-z0-9-_]+)\.git$`);
        super({
            ...constraints,
            format: { f: 'GitSSHURL', regexp: format },
        });
    }
    tName() {
        return 'GitSSHURL';
    }
    example() {
        return 'git@github.com:nodejs/node.git';
    }
}
