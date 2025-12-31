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
import { PRODUCT_NAME_PLACEHOLDER } from '../../../../convention.js';
import { TString } from '../../../../dt/index.js';
import { IllegalArgumentError } from '../../../../error/index.js';
import { EverybodyUCPolicy, } from '../../../../uc/index.js';
import { GIT_KEEP_FILE_NAME } from '../lib/consts.js';
import { successMessage } from '../lib/funcs.js';
import { ProductInputFieldsDef } from '../lib/io.js';
import { files } from '../lib/layers/product.js';
import { SrcFilesGenerator } from '../lib/SrcFilesGenerator.js';
import { Manifest } from '../manifest.js';
let CreateProductClientMain = class CreateProductClientMain {
    fsManager;
    i18nManager;
    logger;
    srcFilesGenerator;
    rootPath;
    constructor(fsManager, i18nManager, logger, srcFilesGenerator) {
        this.fsManager = fsManager;
        this.i18nManager = i18nManager;
        this.logger = logger;
        this.srcFilesGenerator = srcFilesGenerator;
    }
    async exec({ uc }) {
        const productsPath = uc.reqVal0('productsPath');
        const productName = uc.reqVal0('productName');
        this.rootPath = this.fsManager.path(productsPath, productName);
        // TODO : Rollback the whole thing in case of failure
        await this.assertNotExisting();
        await this.createRootDir();
        await this.srcFilesGenerator.exec({
            files: files(productName),
            rootPath: this.rootPath,
        });
        await this.rmGitKeep();
        this.logger.info(successMessage('Product'));
    }
    async assertNotExisting() {
        if (!(await this.fsManager.exists(this.rootPath))) {
            return;
        }
        throw new IllegalArgumentError(this.i18nManager.t('err_existing_product', {
            vars: { productPath: this.rootPath },
        }));
    }
    async createRootDir() {
        this.logger.info('Creating root dir : %s', this.rootPath);
        await this.fsManager.mkdir(this.rootPath, { recursive: true });
    }
    async rmGitKeep() {
        const filePath = this.fsManager.path(this.rootPath, '..', GIT_KEEP_FILE_NAME);
        if (!(await this.fsManager.exists(filePath))) {
            return;
        }
        await this.fsManager.rm(filePath);
    }
};
CreateProductClientMain = __decorate([
    injectable(),
    __param(0, inject('FSManager')),
    __param(1, inject('I18nManager')),
    __param(2, inject('Logger')),
    __param(3, inject(SrcFilesGenerator)),
    __metadata("design:paramtypes", [Object, Object, Object, SrcFilesGenerator])
], CreateProductClientMain);
export const CreateProductUCD = {
    ext: {
        cmd: {
            mountAt: 'CreateProduct',
        },
    },
    io: {
        i: {
            fields: {
                ...ProductInputFieldsDef,
                productName: {
                    type: new TString().setExamples([PRODUCT_NAME_PLACEHOLDER]),
                },
            },
        },
    },
    lifecycle: {
        client: {
            main: CreateProductClientMain,
            policy: EverybodyUCPolicy,
        },
    },
    metadata: Manifest.ucReg.CreateProduct,
};
