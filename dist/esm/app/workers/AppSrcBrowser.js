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
import { APP_ROOT_FROM_UCD, UC_DEF_FILE_NAME_SUFFIX, UC_DEF_SUFFIX, UC_DEF_TYPE, } from '../../convention.js';
import { FSManagerItemInfoType, } from '../../std/index.js';
let AppSrcBrowser = class AppSrcBrowser {
    fsManager;
    constructor(fsManager) {
        this.fsManager = fsManager;
    }
    async exec({ appPathFromUCDPath = APP_ROOT_FROM_UCD, appsPath, ignoreFilesWithSizeGreaterThan = 100_000, patternIndicatingUCD = `${UC_DEF_SUFFIX}: ${UC_DEF_TYPE}`, }) {
        const out = {
            apps: new Map(),
        };
        const items = await this.fsManager.ls(appsPath, {
            recursive: true,
            withFullPath: true,
        });
        for await (const item of items) {
            const { path, type } = item;
            if (type !== FSManagerItemInfoType.FILE) {
                continue;
            }
            if (!path.endsWith(UC_DEF_FILE_NAME_SUFFIX)) {
                continue;
            }
            const { size: sizeInBytes } = await this.fsManager.info(path);
            if (sizeInBytes > ignoreFilesWithSizeGreaterThan) {
                continue;
            }
            const contents = await this.fsManager.cat(path);
            if (!contents.includes(patternIndicatingUCD)) {
                continue;
            }
            const appPath = this.fsManager.path(path, ...appPathFromUCDPath);
            if (!out.apps.has(appPath)) {
                out.apps.set(appPath, []);
            }
            out.apps.get(appPath)?.push({ path, sizeInBytes });
        }
        return out;
    }
};
AppSrcBrowser = __decorate([
    injectable(),
    __param(0, inject('FSManager')),
    __metadata("design:paramtypes", [Object])
], AppSrcBrowser);
export { AppSrcBrowser };
