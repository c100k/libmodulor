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
import { AppUCsLoader, } from '../../app/index.js';
import { TARGET_APPS_ROOT_PATH } from '../../convention.js';
let ProductUCsLoader = class ProductUCsLoader {
    appUCsLoader;
    fsManager;
    productManifest;
    constructor(appUCsLoader, fsManager, productManifest) {
        this.appUCsLoader = appUCsLoader;
        this.fsManager = fsManager;
        this.productManifest = productManifest;
    }
    async exec({ appsRootPath, from = 'target', srcImporter, }) {
        const output = [];
        let actualRootPath = appsRootPath;
        if (!actualRootPath) {
            switch (from) {
                case 'target':
                    actualRootPath = this.fsManager.path(...TARGET_APPS_ROOT_PATH);
                    break;
                default:
                    from;
            }
        }
        for await (const app of this.productManifest.appReg) {
            const ucs = await this.appUCsLoader.exec({
                app,
                appsRootPath: actualRootPath,
                srcImporter,
            });
            output.push(...ucs);
        }
        return output;
    }
};
ProductUCsLoader = __decorate([
    injectable(),
    __param(0, inject(AppUCsLoader)),
    __param(1, inject('FSManager')),
    __param(2, inject('ProductManifest')),
    __metadata("design:paramtypes", [AppUCsLoader, Object, Object])
], ProductUCsLoader);
export { ProductUCsLoader };
