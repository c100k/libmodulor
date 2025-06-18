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
import { ucHTTPContract, } from '../../../uc/index.js';
import { shouldMountUC } from './funcs.js';
import { ServerInstaller } from './ServerInstaller.js';
let ServerBooter = class ServerBooter {
    emailManager;
    fsManager;
    i18nManager;
    jobManager;
    logger;
    productUCsLoader;
    serverManager;
    serverInstaller;
    settingsManager;
    ucManager;
    constructor(emailManager, fsManager, i18nManager, jobManager, logger, productUCsLoader, serverManager, serverInstaller, settingsManager, ucManager) {
        this.emailManager = emailManager;
        this.fsManager = fsManager;
        this.i18nManager = i18nManager;
        this.jobManager = jobManager;
        this.logger = logger;
        this.productUCsLoader = productUCsLoader;
        this.serverManager = serverManager;
        this.serverInstaller = serverInstaller;
        this.settingsManager = settingsManager;
        this.ucManager = ucManager;
    }
    s() {
        return {
            server_static_dir_path: this.settingsManager.get()('server_static_dir_path'),
            server_tmp_path: this.settingsManager.get()('server_tmp_path'),
        };
    }
    async exec({ appsRootPath, autoMountUCs = true, srcImporter, }) {
        this.logger.info('Initializing i18n manager');
        await this.i18nManager.init();
        this.logger.info('Installing');
        await this.serverInstaller.exec();
        this.logger.info('Initializing job manager');
        await this.jobManager.init();
        this.logger.info('Verifying email manager');
        await this.emailManager.verify();
        this.logger.info('Initializing server manager');
        await this.serverManager.init();
        if (autoMountUCs) {
            const ucs = await this.productUCsLoader.exec({
                appsRootPath,
                srcImporter,
            });
            for await (const uc of ucs) {
                await this.mountUC(uc);
            }
        }
        const staticDirPath = this.s().server_static_dir_path;
        if (staticDirPath) {
            if (!(await this.fsManager.exists(staticDirPath))) {
                throw new Error(`Static dir '${staticDirPath}' does not exist`);
            }
            this.logger.info('Mounting static dir', { staticDirPath });
            await this.serverManager.mountStaticDir(staticDirPath);
        }
        const tmpDirPath = this.s().server_tmp_path;
        if (!(await this.fsManager.exists(tmpDirPath))) {
            await this.fsManager.mkdir(tmpDirPath);
        }
        await this.serverManager.warmUp();
        await this.serverManager.start();
    }
    async mountUC(uc) {
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
        await this.ucManager.initServer(uc);
        await this.serverManager.mount(uc.appManifest, uc.def, contract);
    }
};
ServerBooter = __decorate([
    injectable(),
    __param(0, inject('EmailManager')),
    __param(1, inject('FSManager')),
    __param(2, inject('I18nManager')),
    __param(3, inject('JobManager')),
    __param(4, inject('Logger')),
    __param(5, inject(ProductUCsLoader)),
    __param(6, inject('ServerManager')),
    __param(7, inject(ServerInstaller)),
    __param(8, inject('SettingsManager')),
    __param(9, inject('UCManager')),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, ProductUCsLoader, Object, ServerInstaller, Object, Object])
], ServerBooter);
export { ServerBooter };
