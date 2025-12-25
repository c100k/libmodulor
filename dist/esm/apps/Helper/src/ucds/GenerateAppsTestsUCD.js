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
import { THostPort, TString, TUIntDuration, } from '../../../../dt/index.js';
import { EverybodyUCPolicy, } from '../../../../uc/index.js';
import { AppInputFieldsDef } from '../lib/io.js';
import { Manifest } from '../manifest.js';
const DEP_MAPPING_SEP = '::';
class TDepMapping extends TString {
}
let GenerateAppsTestsClientMain = class GenerateAppsTestsClientMain {
    appSrcBrowser;
    appTestSuiteEmitter;
    logger;
    constructor(appSrcBrowser, appTestSuiteEmitter, logger) {
        this.appSrcBrowser = appSrcBrowser;
        this.appTestSuiteEmitter = appTestSuiteEmitter;
        this.logger = logger;
    }
    async exec({ uc, }) {
        const appsPath = uc.reqVal0('appsPath');
        const depsMapping = uc.rValArr('depsMapping');
        const monkeyTestingTimeoutInMs = uc.reqVal0('monkeyTestingTimeoutInMs');
        const serverPortRangeStart = uc.reqVal0('serverPortRangeStart');
        const { apps } = await this.appSrcBrowser.exec({
            appsPath,
        });
        // Keeping it simple without any defensive programming. Be responsible !
        const depsMappingParsed = new Map((depsMapping || []).map((dm) => dm.split(DEP_MAPPING_SEP)));
        let idx = 0;
        for await (const [appPath] of apps) {
            this.logger.info('Emitting test suite for app : %s', appPath);
            await this.appTestSuiteEmitter.exec({
                appPath,
                depsMapping: depsMappingParsed,
                idx,
                monkeyTestingTimeoutInMs,
                serverPortRangeStart,
            });
            idx++;
        }
    }
};
GenerateAppsTestsClientMain = __decorate([
    injectable(),
    __param(0, inject(AppSrcBrowser)),
    __param(1, inject('AppTestSuiteEmitter')),
    __param(2, inject('Logger')),
    __metadata("design:paramtypes", [AppSrcBrowser, Object, Object])
], GenerateAppsTestsClientMain);
export const GenerateAppsTestsUCD = {
    ext: {
        cmd: {
            mountAt: 'GenerateAppsTests',
        },
    },
    io: {
        i: {
            fields: {
                ...AppInputFieldsDef,
                depsMapping: {
                    cardinality: {
                        max: 20, // A totally arbitrary number
                        min: 0,
                    },
                    type: new TDepMapping().setExamples([
                        `Configurator.js${DEP_MAPPING_SEP}Configurator`,
                    ]),
                },
                monkeyTestingTimeoutInMs: {
                    cardinality: {
                        min: 0,
                    },
                    type: new TUIntDuration({ min: 5_000 })
                        .setDefaultValue(20_000)
                        .setExamples([20_000]),
                },
                serverPortRangeStart: {
                    cardinality: {
                        min: 0,
                    },
                    type: new THostPort()
                        .setDefaultValue(14_000)
                        .setExamples([14_000]), // "Calvados ❤️"
                },
            },
        },
    },
    lifecycle: {
        client: {
            main: GenerateAppsTestsClientMain,
            policy: EverybodyUCPolicy,
        },
    },
    metadata: Manifest.ucReg.GenerateAppsTests,
};
