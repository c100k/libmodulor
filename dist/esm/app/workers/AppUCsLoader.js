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
import { UCBuilder, } from '../../uc/index.js';
import { AppManifestLoader } from './AppManifestLoader.js';
import { UCDefLoader } from './UCDefLoader.js';
let AppUCsLoader = class AppUCsLoader {
    appManifestLoader;
    logger;
    ucBuilder;
    ucDefLoader;
    constructor(appManifestLoader, logger, ucBuilder, ucDefLoader) {
        this.appManifestLoader = appManifestLoader;
        this.logger = logger;
        this.ucBuilder = ucBuilder;
        this.ucDefLoader = ucDefLoader;
    }
    async exec({ app, appsRootPath, srcImporter, }) {
        const output = [];
        const { name, ucds } = app;
        const loaderInput = {
            appName: name,
            appsRootPath,
            ext: 'js',
        };
        const appManifest = await this.appManifestLoader.exec({
            ...loaderInput,
            srcImporter: srcImporter,
        });
        const ucNames = Object.keys(appManifest.ucReg);
        for (const ucName of ucNames) {
            if (ucds?.exclude?.includes(ucName)) {
                this.logger.debug('Excluding ucd', { name, ucName });
                continue;
            }
            const ucd = await this.ucDefLoader.exec({
                ...loaderInput,
                srcImporter: srcImporter,
                ucName,
            });
            output.push(this.ucBuilder.exec({ appManifest, auth: null, def: ucd }));
        }
        return output;
    }
};
AppUCsLoader = __decorate([
    injectable(),
    __param(0, inject(AppManifestLoader)),
    __param(1, inject('Logger')),
    __param(2, inject(UCBuilder)),
    __param(3, inject(UCDefLoader)),
    __metadata("design:paramtypes", [AppManifestLoader, Object, UCBuilder,
        UCDefLoader])
], AppUCsLoader);
export { AppUCsLoader };
