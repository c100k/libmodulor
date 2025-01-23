import { TString } from '../base/TString.js';
export class TSearchQuery extends TString {
    config;
    tName() {
        return 'SearchQuery';
    }
    configure(config) {
        this.config = config;
        return this;
    }
    example() {
        return 'Nike Streakfly';
    }
    getConfig() {
        return this.config;
    }
    htmlInputType() {
        return 'search';
    }
    rnInputMode() {
        return 'search';
    }
}
