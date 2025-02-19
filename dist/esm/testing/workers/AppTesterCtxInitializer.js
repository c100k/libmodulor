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
import { Container, inject, injectable } from 'inversify';
import { APP_I18N_FILE_NAME, APP_MANIFEST_FILE_NAME, APP_SRC_DIR_NAME, APP_SRC_UCDS_DIR_NAME, UC_DEF_FILE_NAME_SUFFIX, } from '../../convention.js';
import { FSManagerItemInfoType, } from '../../std/index.js';
import { CONTAINER_OPTS } from '../../utils/index.js';
let AppTesterCtxInitializer = class AppTesterCtxInitializer {
    fsManager;
    constructor(fsManager) {
        this.fsManager = fsManager;
    }
    async exec({ appPath, srcImporter }) {
        const container = new Container(CONTAINER_OPTS);
        const srcDirPath = this.fsManager.path(appPath, APP_SRC_DIR_NAME);
        const { Manifest: appManifest } = await srcImporter(this.fsManager.path(srcDirPath, APP_MANIFEST_FILE_NAME));
        const { I18n: appI18n } = await srcImporter(this.fsManager.path(srcDirPath, APP_I18N_FILE_NAME));
        const ucdsPath = this.fsManager.path(srcDirPath, APP_SRC_UCDS_DIR_NAME);
        const filePaths = await this.fsManager.ls(ucdsPath);
        const ucdFilePaths = filePaths.filter(({ path, type }) => path.endsWith(UC_DEF_FILE_NAME_SUFFIX) &&
            type === FSManagerItemInfoType.FILE);
        // Initially, this was using Promise.all.
        // But in some cases, it hangs. I didn't investigate more, but I suspect some lock on the CPU or FileSystem.
        // There were exactly 6 use cases.
        // Since 'for await of' fixes it, let's just use and investigate when we have more time.
        const ucdRefs = [];
        for await (const { path } of ucdFilePaths) {
            ucdRefs.push({
                fileName: path,
                source: await srcImporter(this.fsManager.path(ucdsPath, path)),
                name: path.replace(UC_DEF_FILE_NAME_SUFFIX, ''),
            });
        }
        // Sorting is necessary because the file system sorting is not necessarily the same as A-Z sorting.
        // Indeed, CreatePostUCD will arrive after CreatePostCommentUCD in the file system.
        // But in alphabetical order, CreatePost should arrive before CreatePostComment.
        ucdRefs.sort((a, b) => a.name.localeCompare(b.name));
        return {
            ctx: {
                appI18n,
                appManifest,
                appPath,
                container,
                opts: undefined,
                ucdRefs,
            },
        };
    }
};
AppTesterCtxInitializer = __decorate([
    injectable(),
    __param(0, inject('FSManager')),
    __metadata("design:paramtypes", [Object])
], AppTesterCtxInitializer);
export { AppTesterCtxInitializer };
