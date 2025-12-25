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
import { APP_NAME_PLACEHOLDER } from '../../../../convention.js';
import { TBoolean, TString } from '../../../../dt/index.js';
import { IllegalArgumentError } from '../../../../error/index.js';
import { SimpleHTMLAppTestReportEmitter } from '../../../../testing/impl/SimpleHTMLAppTestReportEmitter.js';
import { EverybodyUCPolicy, } from '../../../../uc/index.js';
import { AppInputFieldsDef } from '../lib/io.js';
import { Manifest } from '../manifest.js';
let TestAppClientMain = class TestAppClientMain {
    appTestSuiteRunner;
    fsManager;
    i18nManager;
    logger;
    simpleHTMLAppTestReportEmitter;
    constructor(appTestSuiteRunner, fsManager, i18nManager, logger, simpleHTMLAppTestReportEmitter) {
        this.appTestSuiteRunner = appTestSuiteRunner;
        this.fsManager = fsManager;
        this.i18nManager = i18nManager;
        this.logger = logger;
        this.simpleHTMLAppTestReportEmitter = simpleHTMLAppTestReportEmitter;
    }
    async exec({ uc }) {
        const appsPath = uc.reqVal0('appsPath');
        const appName = uc.reqVal0('appName');
        const only = uc.rVal0('only');
        const skipCoverage = uc.reqVal0('skipCoverage');
        const updateSnapshots = uc.reqVal0('updateSnapshots');
        const appPath = this.fsManager.path(appsPath, appName);
        if (!(await this.fsManager.exists(appPath))) {
            throw new IllegalArgumentError(this.i18nManager.t('err_unknown_app', { vars: { appPath } }));
        }
        await this.appTestSuiteRunner.exec({
            appPath,
            only,
            skipCoverage,
            updateSnapshots,
        });
        const reports = [
            [
                'Coverage Report',
                await this.appTestSuiteRunner.coverageReportEntrypointPath(appPath),
            ],
            [
                'Simple HTML Report',
                await this.simpleHTMLAppTestReportEmitter.entrypointPath(appPath),
            ],
        ];
        for await (const [name, path] of reports) {
            if (await this.fsManager.exists(path)) {
                this.logger.info(`${name} => open ${path}`);
            }
        }
    }
};
TestAppClientMain = __decorate([
    injectable(),
    __param(0, inject('AppTestSuiteRunner')),
    __param(1, inject('FSManager')),
    __param(2, inject('I18nManager')),
    __param(3, inject('Logger')),
    __param(4, inject(SimpleHTMLAppTestReportEmitter)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, SimpleHTMLAppTestReportEmitter])
], TestAppClientMain);
export const TestAppUCD = {
    ext: {
        cmd: {
            mountAt: 'TestApp',
        },
    },
    io: {
        i: {
            fields: {
                ...AppInputFieldsDef,
                appName: {
                    type: new TString().setExamples([APP_NAME_PLACEHOLDER]),
                },
                only: {
                    cardinality: {
                        min: 0,
                    },
                    type: new TString().setExamples(['CreatePost']),
                },
                skipCoverage: {
                    type: new TBoolean().setDefaultValue(false),
                },
                updateSnapshots: {
                    type: new TBoolean().setDefaultValue(false),
                },
            },
        },
    },
    lifecycle: {
        client: {
            main: TestAppClientMain,
            policy: EverybodyUCPolicy,
        },
    },
    metadata: Manifest.ucReg.TestApp,
};
