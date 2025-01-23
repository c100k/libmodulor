import { TString } from '../base/TString.js';
export class TMarkdown extends TString {
    tName() {
        return 'Markdown';
    }
    example() {
        return '**Some important stuff**';
    }
    isPotentiallyLong() {
        return true;
    }
}
