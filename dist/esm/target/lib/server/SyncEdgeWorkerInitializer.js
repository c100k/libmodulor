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
import { ucHTTPContract, } from '../../../uc/index.js';
import { shouldMountUC } from './funcs.js';
let SyncEdgeWorkerInitializer = class SyncEdgeWorkerInitializer {
    i18nManager;
    jobManager;
    logger;
    serverManager;
    constructor(i18nManager, jobManager, logger, serverManager) {
        this.i18nManager = i18nManager;
        this.jobManager = jobManager;
        this.logger = logger;
        this.serverManager = serverManager;
    }
    exec({ autoMountUCs = true, ucs }) {
        this.logger.info('Initializing i18n manager');
        this.i18nManager.initSync();
        // Not available in Sync yet
        // this.logger.info('Installing');
        // await this.serverInstaller.exec();
        this.logger.info('Initializing job manager');
        this.jobManager.initSync();
        // Not available in Sync yet
        // this.logger.info('Verifying email manager');
        // await this.emailManager.verify();
        this.logger.info('Initializing server manager');
        this.serverManager.initSync();
        if (autoMountUCs) {
            for (const uc of ucs) {
                this.mountUC(uc);
            }
        }
    }
    mountUC(uc) {
        const { sec } = uc.def;
        const contract = ucHTTPContract(uc);
        const { mountingPoint } = contract;
        const shouldNotMountReason = shouldMountUC(uc.def);
        if (shouldNotMountReason) {
            this.logger.debug(`Not mounting ${mountingPoint}`, {
                reason: shouldNotMountReason,
            });
            return;
        }
        this.logger.info(`Mounting ${mountingPoint}`, {
            contract,
            sec,
        });
        // Not available in Sync yet
        // await this.ucManager.initServer(uc);
        this.serverManager.mountSync(uc.appManifest, uc.def, contract);
    }
};
SyncEdgeWorkerInitializer = __decorate([
    injectable(),
    __param(0, inject('I18nManager')),
    __param(1, inject('JobManager')),
    __param(2, inject('Logger')),
    __param(3, inject('ServerManager')),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], SyncEdgeWorkerInitializer);
export { SyncEdgeWorkerInitializer };
