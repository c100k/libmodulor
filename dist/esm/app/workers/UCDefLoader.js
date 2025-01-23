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
import { APP_SRC_UCDS_DIR_NAME, UC_DEF_SUFFIX } from '../../convention.js';
import { AppSrcFilePathBuilder, } from './AppSrcFilePathBuilder.js';
const ERR_UCD_NOT_FOUND = (appName, ucName, importPath) => `Could not find use case named ${ucName} in app ${appName} at ${importPath}`;
const ERR_UCD_NO_KEY = (key, importPath) => `Could not find key ${key} in ${importPath}`;
let UCDefLoader = class UCDefLoader {
    appSrcFilePathBuilder;
    constructor(appSrcFilePathBuilder) {
        this.appSrcFilePathBuilder = appSrcFilePathBuilder;
    }
    async exec({ appName, appsRootAlias, appsRootAliasUseDefault, appsRootPath, ext, srcImporter, ucName, }) {
        const importPath = this.appSrcFilePathBuilder.exec({
            appName,
            appsRootAlias,
            appsRootAliasUseDefault,
            appsRootPath,
            ext,
            filePathParts: [APP_SRC_UCDS_DIR_NAME, `${ucName}${UC_DEF_SUFFIX}`],
        });
        let src;
        try {
            src = await srcImporter(importPath);
        }
        catch (err) {
            throw new Error(ERR_UCD_NOT_FOUND(appName, ucName, importPath), {
                cause: err,
            });
        }
        const key = `${ucName}${UC_DEF_SUFFIX}`;
        if (!(key in src)) {
            throw new Error(ERR_UCD_NO_KEY(key, importPath));
        }
        const ucd = src[key];
        if (!ucd) {
            throw new Error(ERR_UCD_NO_KEY(key, importPath));
        }
        return ucd;
    }
};
UCDefLoader = __decorate([
    injectable(),
    __param(0, inject(AppSrcFilePathBuilder)),
    __metadata("design:paramtypes", [AppSrcFilePathBuilder])
], UCDefLoader);
export { UCDefLoader };
