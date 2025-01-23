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
import { UCDataStoreExternalResourceManager } from '../../../std/impl/UCDataStoreExternalResourceManager.js';
import { ExternalResourceInstaller, } from '../../../std/index.js';
let ServerInstaller = class ServerInstaller {
    externalResourceInstaller;
    logger;
    ucDataStoreERM;
    constructor(externalResourceInstaller, logger, ucDataStoreERM) {
        this.externalResourceInstaller = externalResourceInstaller;
        this.logger = logger;
        this.ucDataStoreERM = ucDataStoreERM;
    }
    async exec() {
        await this.externalResourceInstaller.exec({
            autoGenerate: true,
            force: false,
            manager: this.ucDataStoreERM,
            onFeedback: (feedback) => this.onFeedback(feedback),
        });
    }
    async onFeedback(feedback) {
        this.logger.info(feedback.message);
    }
};
ServerInstaller = __decorate([
    injectable(),
    __param(0, inject(ExternalResourceInstaller)),
    __param(1, inject('Logger')),
    __param(2, inject(UCDataStoreExternalResourceManager)),
    __metadata("design:paramtypes", [ExternalResourceInstaller, Object, UCDataStoreExternalResourceManager])
], ServerInstaller);
export { ServerInstaller };
