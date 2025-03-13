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
import { APP_I18N_FILE_NAME, APP_INSTALLER_FILE_NAME, APP_MANIFEST_FILE_NAME, APP_SETTINGS_FILE_NAME, APP_SRC_DIR_NAME, APP_SRC_LIB_DIR_NAME, APP_SRC_UCDS_DIR_NAME, } from '../../../convention.js';
const ALLOWED_SRC_ITEMS = [
    APP_SRC_LIB_DIR_NAME,
    APP_SRC_UCDS_DIR_NAME,
    APP_I18N_FILE_NAME,
    APP_INSTALLER_FILE_NAME,
    APP_MANIFEST_FILE_NAME,
    APP_SETTINGS_FILE_NAME,
];
const ERR_UNALLOWED_SRC_ITEM = (item) => `The app ${APP_SRC_DIR_NAME} folder should contain only the following items : ${ALLOWED_SRC_ITEMS.join(', ')} but found ${item}. Remove it or move it to 'lib'`;
let AppFolderChecker = class AppFolderChecker {
    fsManager;
    output;
    constructor(fsManager) {
        this.fsManager = fsManager;
        this.output = { errors: [] };
    }
    async exec({ appPath }) {
        const srcPath = this.fsManager.path(appPath, APP_SRC_DIR_NAME);
        const contents = await this.fsManager.ls(srcPath);
        const items = contents.map((i) => i.path);
        this.makeSureSrcItemsAreAllowed(items);
        return this.output;
    }
    makeSureSrcItemsAreAllowed(items) {
        for (const item of items) {
            if (!ALLOWED_SRC_ITEMS.includes(item)) {
                this.output.errors.push(ERR_UNALLOWED_SRC_ITEM(item));
            }
        }
    }
};
AppFolderChecker = __decorate([
    injectable(),
    __param(0, inject('FSManager')),
    __metadata("design:paramtypes", [Object])
], AppFolderChecker);
export { AppFolderChecker };
