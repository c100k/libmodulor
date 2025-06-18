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
import { UCBuilder } from '../../uc/index.js';
let SyncProductUCsLoader = class SyncProductUCsLoader {
    logger;
    productManifest;
    ucBuilder;
    constructor(logger, productManifest, ucBuilder) {
        this.logger = logger;
        this.productManifest = productManifest;
        this.ucBuilder = ucBuilder;
    }
    exec({ defs }) {
        const ucs = [];
        for (const [appManifest, ucds] of defs.entries()) {
            const app = this.productManifest.appReg.find((a) => a.name === appManifest.name);
            if (!app) {
                throw new Error(`The app ${appManifest.name} must be registered in the product manifest`);
            }
            for (const ucd of ucds) {
                if (app.ucds?.exclude?.includes(ucd.metadata.name)) {
                    this.logger.debug('Excluding ucd', {
                        name: app.name,
                        ucName: ucd.metadata.name,
                    });
                    continue;
                }
                ucs.push(this.ucBuilder.exec({ appManifest, auth: null, def: ucd }));
            }
        }
        return ucs;
    }
};
SyncProductUCsLoader = __decorate([
    injectable(),
    __param(0, inject('Logger')),
    __param(1, inject('ProductManifest')),
    __param(2, inject(UCBuilder)),
    __metadata("design:paramtypes", [Object, Object, UCBuilder])
], SyncProductUCsLoader);
export { SyncProductUCsLoader };
