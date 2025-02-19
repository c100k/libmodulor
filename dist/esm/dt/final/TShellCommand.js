import { TString } from '../base/TString.js';
// TODO : Add basic syntax validation (without adding any dependencies)
export class TShellCommand extends TString {
    tName() {
        return 'ShellCommand';
    }
    example() {
        return 'sudo systemctl restart nginx';
    }
    isPotentiallyLong() {
        return true;
    }
}
