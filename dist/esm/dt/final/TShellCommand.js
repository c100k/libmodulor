import { TString } from '../base/TString.js';
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
