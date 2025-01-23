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
let ProductUCsLoader = class ProductUCsLoader {
    appUCsLoader;
    productManifest;
    constructor(appUCsLoader, productManifest) {
        this.appUCsLoader = appUCsLoader;
        this.productManifest = productManifest;
    }
    async exec({ appsRootPath, srcImporter }) {
        const output = [];
        for await (const app of this.productManifest.appReg) {
            const ucs = await this.appUCsLoader.exec({
                app,
                appsRootPath,
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
    __param(1, inject('ProductManifest')),
    __metadata("design:paramtypes", [AppUCsLoader, Object])
], ProductUCsLoader);
export { ProductUCsLoader };
