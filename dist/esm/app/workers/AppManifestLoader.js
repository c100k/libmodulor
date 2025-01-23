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
import { APP_MANIFEST_NAME } from '../../convention.js';
import { AppSrcFilePathBuilder, } from './AppSrcFilePathBuilder.js';
const ERR_APP_NOT_FOUND = (appName) => `Could not find app named ${appName}`;
let AppManifestLoader = class AppManifestLoader {
    appSrcFilePathBuilder;
    constructor(appSrcFilePathBuilder) {
        this.appSrcFilePathBuilder = appSrcFilePathBuilder;
    }
    async exec({ appName, appsRootAlias, appsRootAliasUseDefault, appsRootPath, ext, srcImporter, }) {
        const importPath = this.appSrcFilePathBuilder.exec({
            appName,
            appsRootAlias,
            appsRootAliasUseDefault,
            appsRootPath,
            ext,
            filePathParts: [APP_MANIFEST_NAME.toLowerCase()],
        });
        let src;
        try {
            src = await srcImporter(importPath);
        }
        catch (err) {
            throw new Error(ERR_APP_NOT_FOUND(appName), {
                cause: err,
            });
        }
        const key = APP_MANIFEST_NAME;
        if (!(key in src)) {
            throw new Error(ERR_APP_NOT_FOUND(appName));
        }
        const ucd = src[key];
        if (!ucd) {
            throw new Error(ERR_APP_NOT_FOUND(appName));
        }
        return ucd;
    }
};
AppManifestLoader = __decorate([
    injectable(),
    __param(0, inject(AppSrcFilePathBuilder)),
    __metadata("design:paramtypes", [AppSrcFilePathBuilder])
], AppManifestLoader);
export { AppManifestLoader };
