var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { inject, injectable } from 'inversify';
import { APP_INDEX_FILE_NAME } from '../../../convention.js';
const ERR_INDEX_EXPOSE_NECESSARY = () => `The ${APP_INDEX_FILE_NAME} must expose the necessary : comment, I18n, Manifest`;
let AppIndexChecker = class AppIndexChecker {
    fsManager;
    output;
    constructor(fsManager) {
        this.fsManager = fsManager;
        this.output = { errors: [] };
    }
    async exec({ appPath }) {
        // TODO : Consider changing this to await import like the other checkers
        const contents = await this.fsManager.cat(this.fsManager.path(appPath, APP_INDEX_FILE_NAME));
        this.makeSureExposesNecessary(contents);
        return this.output;
    }
    makeSureExposesNecessary(contents) {
        if (!contents.includes("// Expose only what's necessary") ||
            !contents.includes("export { I18n } from './src/i18n.js'") ||
            !contents.includes("export { Manifest } from './src/manifest.js'")) {
            this.output.errors.push(ERR_INDEX_EXPOSE_NECESSARY());
        }
    }
};
AppIndexChecker = __decorate([
    injectable(),
    __param(0, inject('FSManager')),
    __metadata("design:paramtypes", [Object])
], AppIndexChecker);
export { AppIndexChecker };
