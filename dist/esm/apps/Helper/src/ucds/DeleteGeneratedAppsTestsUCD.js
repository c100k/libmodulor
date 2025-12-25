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
import { AppSrcBrowser } from '../../../../app/index.js';
import { APP_TEST_DIR_NAME, APP_TEST_MAIN_FILE_NAME, } from '../../../../convention.js';
import { EverybodyUCPolicy, } from '../../../../uc/index.js';
import { AppInputFieldsDef } from '../lib/io.js';
import { Manifest } from '../manifest.js';
let DeleteGeneratedAppsTestsClientMain = class DeleteGeneratedAppsTestsClientMain {
    appSrcBrowser;
    fsManager;
    logger;
    constructor(appSrcBrowser, fsManager, logger) {
        this.appSrcBrowser = appSrcBrowser;
        this.fsManager = fsManager;
        this.logger = logger;
    }
    async exec({ uc, }) {
        const appsPath = uc.reqVal0('appsPath');
        const { apps } = await this.appSrcBrowser.exec({
            appsPath,
        });
        for await (const [appPath] of apps) {
            this.logger.info('Deleting test suite for app : %s', appPath);
            const filePath = this.fsManager.path(appPath, APP_TEST_DIR_NAME, APP_TEST_MAIN_FILE_NAME);
            if (await this.fsManager.exists(filePath)) {
                this.logger.info('Deleting file : %s', filePath);
                await this.fsManager.rm(filePath);
            }
        }
    }
};
DeleteGeneratedAppsTestsClientMain = __decorate([
    injectable(),
    __param(0, inject(AppSrcBrowser)),
    __param(1, inject('FSManager')),
    __param(2, inject('Logger')),
    __metadata("design:paramtypes", [AppSrcBrowser, Object, Object])
], DeleteGeneratedAppsTestsClientMain);
export const DeleteGeneratedAppsTestsUCD = {
    ext: {
        cmd: {
            mountAt: 'DeleteGeneratedAppsTests',
        },
    },
    io: {
        i: {
            fields: {
                ...AppInputFieldsDef,
            },
        },
    },
    lifecycle: {
        client: {
            main: DeleteGeneratedAppsTestsClientMain,
            policy: EverybodyUCPolicy,
        },
    },
    metadata: Manifest.ucReg.DeleteGeneratedAppsTests,
};
