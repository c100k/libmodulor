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
import { ProductUCsLoader } from '../../../product/index.js';
import { ucHTTPContract } from '../../../uc/index.js';
let MCPServerBooter = class MCPServerBooter {
    i18nManager;
    logger;
    productUCsLoader;
    serverManager;
    ucManager;
    constructor(i18nManager, logger, productUCsLoader, serverManager, ucManager) {
        this.i18nManager = i18nManager;
        this.logger = logger;
        this.productUCsLoader = productUCsLoader;
        this.serverManager = serverManager;
        this.ucManager = ucManager;
    }
    async exec({ appsRootPath, srcImporter }) {
        try {
            await this.i18nManager.init();
            await this.serverManager.init();
            const ucs = await this.productUCsLoader.exec({
                appsRootPath,
                srcImporter,
            });
            for await (const uc of ucs) {
                // Declared only for compatibility with ServerManager's contract but not used
                const contract = ucHTTPContract(uc);
                await this.ucManager.initServer(uc);
                await this.serverManager.mount(uc.appManifest, uc.def, contract);
            }
            await this.serverManager.warmUp();
            await this.serverManager.start();
        }
        catch (err) {
            this.logger.error(err);
        }
    }
};
MCPServerBooter = __decorate([
    injectable(),
    __param(0, inject('I18nManager')),
    __param(1, inject('Logger')),
    __param(2, inject(ProductUCsLoader)),
    __param(3, inject('ServerManager')),
    __param(4, inject('UCManager')),
    __metadata("design:paramtypes", [Object, Object, ProductUCsLoader, Object, Object])
], MCPServerBooter);
export { MCPServerBooter };
