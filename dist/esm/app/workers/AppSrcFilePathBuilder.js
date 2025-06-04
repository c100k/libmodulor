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
import { APP_SRC_DIR_NAME, APPS_ROOT_ALIAS, APPS_ROOT_DIR_NAME, } from '../../convention.js';
let AppSrcFilePathBuilder = class AppSrcFilePathBuilder {
    fsManager;
    logger;
    constructor(fsManager, logger) {
        this.fsManager = fsManager;
        this.logger = logger;
    }
    exec({ appName, appsRootAlias, appsRootAliasUseDefault, appsRootPath, ext, filePathParts, }) {
        const appPath = this.fsManager.path(appsRootPath ?? APPS_ROOT_DIR_NAME, appName);
        let importPath = '';
        if (appsRootAliasUseDefault) {
            importPath = this.fsManager.path(APPS_ROOT_ALIAS, appName); // @apps/MyApp
        }
        else if (appsRootAlias) {
            importPath = this.fsManager.path(appsRootAlias, appName); // @myapps/MyApp
        }
        else {
            importPath = this.fsManager.path(appPath); // src/apps/MyApp
            importPath = `./${importPath}`; // ./src/apps/MyApp
        }
        const filePath = this.fsManager.path(APP_SRC_DIR_NAME, ...filePathParts);
        // NOTE 1 : We don't check if the path exists because it wouldn't work when using an alias. So we let the caller do it. For example when using `import` it will fail by itself.
        // NOTE 2 : Not using `path()` to join in order to avoid the initial `./` to be removed (this is the default behavior of node's join function).
        const suffix = ext ? `.${ext}` : '';
        const path = `${importPath}/${filePath}${suffix}`;
        this.logger.trace('Resolving app src', { path });
        return path;
    }
};
AppSrcFilePathBuilder = __decorate([
    injectable(),
    __param(0, inject('FSManager')),
    __param(1, inject('Logger')),
    __metadata("design:paramtypes", [Object, Object])
], AppSrcFilePathBuilder);
export { AppSrcFilePathBuilder };
