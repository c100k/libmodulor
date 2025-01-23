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
import { I18nEN } from '../i18n/locales/en.js';
import { I18nFR } from '../i18n/locales/fr.js';
import { FAKE_USER_ADMIN, UCBuilder, UCInputFieldChangeOperator, ucHTTPContract, } from '../uc/index.js';
import { SimpleHTMLAppTestReportEmitter } from './impl/SimpleHTMLAppTestReportEmitter.js';
import { optsAllSet } from './opts.js';
import { defaultUCAuthSetters } from './uc-auth.js';
import { allWithExamples, defaultUCInputFillers, } from './uc-input.js';
import { awaitForSrcImport } from './utils.js';
import { AppTesterCtxInitializer } from './workers/AppTesterCtxInitializer.js';
import { UCExecutor, } from './workers/UCExecutor.js';
import { AppI18nChecker } from './workers/checkers/AppI18nChecker.js';
import { AppIndexChecker } from './workers/checkers/AppIndexChecker.js';
import { AppManifestChecker } from './workers/checkers/AppManifestChecker.js';
import { UCDefChecker } from './workers/checkers/UCDefChecker.js';
import { UCDefSourcesChecker, } from './workers/checkers/UCDefSourcesChecker.js';
let AppTester = class AppTester {
    appDocsEmitter;
    appI18nChecker;
    appIndexChecker;
    appManifestChecker;
    appTesterCtxInitializer;
    serverManager;
    simpleHTMLAppTestReportEmitter;
    ucBuilder;
    ucDefChecker;
    ucDefSourcesChecker;
    ucExecutor;
    configurator;
    ctx;
    safeSrcImporter;
    testResults;
    testSummary;
    ucDefSourcesCheckerOutput;
    constructor(appDocsEmitter, appI18nChecker, appIndexChecker, appManifestChecker, appTesterCtxInitializer, serverManager, simpleHTMLAppTestReportEmitter, ucBuilder, ucDefChecker, ucDefSourcesChecker, ucExecutor) {
        this.appDocsEmitter = appDocsEmitter;
        this.appI18nChecker = appI18nChecker;
        this.appIndexChecker = appIndexChecker;
        this.appManifestChecker = appManifestChecker;
        this.appTesterCtxInitializer = appTesterCtxInitializer;
        this.serverManager = serverManager;
        this.simpleHTMLAppTestReportEmitter = simpleHTMLAppTestReportEmitter;
        this.ucBuilder = ucBuilder;
        this.ucDefChecker = ucDefChecker;
        this.ucDefSourcesChecker = ucDefSourcesChecker;
        this.ucExecutor = ucExecutor;
        this.testResults = [];
        this.testSummary = {
            counts: {
                danger: 0,
                success: 0,
                warning: 0,
            },
        };
    }
    async checkAppI18n() {
        const { errors } = await this.appI18nChecker.exec({
            appManifest: this.ctx.appManifest,
            appI18n: this.ctx.appI18n,
        });
        if (errors.length > 0) {
            throw new Error(errors[0]);
        }
    }
    async checkAppIndex() {
        const { errors } = await this.appIndexChecker.exec({
            appPath: this.ctx.appPath,
        });
        if (errors.length > 0) {
            throw new Error(errors[0]);
        }
    }
    async checkAppManifest() {
        const { errors } = await this.appManifestChecker.exec({
            appManifest: this.ctx.appManifest,
            ucdRefs: this.ctx.ucdRefs,
        });
        if (errors.length > 0) {
            throw new Error(errors[0]);
        }
    }
    async checkUCDSources() {
        this.ucDefSourcesCheckerOutput = await this.ucDefSourcesChecker.exec({
            ctx: this.ctx,
        });
    }
    async checkUC(ucdRef) {
        const { errors } = await this.ucDefChecker.exec({ ucdRef });
        if (errors.length > 0) {
            throw new Error(errors[0]);
        }
        const { source } = ucdRef;
        const ucd = source[`${Object.keys(source)[0]}`];
        return ucd;
    }
    async execFlow(flow) {
        const output = [];
        const { auth, authName, setup, steps } = flow;
        await setup?.(this.ctx);
        for await (const [ucd, inputOverride] of steps) {
            const inputFiller = (uc) => {
                allWithExamples(uc);
                if (inputOverride) {
                    const inputOverrides = inputOverride(output);
                    for (const [k, v] of Object.entries(inputOverrides)) {
                        uc.inputField(k).setValue(UCInputFieldChangeOperator.SET, v);
                    }
                }
            };
            const { out } = await this.execUC({
                auth: auth ?? FAKE_USER_ADMIN,
                authName: authName ?? 'ADMIN',
                inputFiller,
                inputFillerName: 'FLOW',
                ucd,
            }, flow);
            output.push(out);
        }
        return output;
    }
    async execMonkeyTest(ucd, input) {
        const inputFiller = (uc) => {
            uc.fill(input);
        };
        const { out } = await this.execUC({
            auth: FAKE_USER_ADMIN,
            authName: 'ADMIN',
            inputFiller,
            inputFillerName: 'ANY_FIELD_AS_ANYTHING',
            ucd,
        });
        return out;
    }
    async execUC(input, flow) {
        const { out } = await this.ucExecutor.exec({
            ...input,
            appManifest: this.ctx.appManifest,
        });
        let status = 'warning';
        if (!out.err) {
            status = 'success';
        }
        else {
            const { name } = out.err;
            switch (name) {
                case 'CustomError':
                    break;
                case 'Error':
                case 'TypeError':
                    status = 'danger';
                    break;
                default:
                    break;
            }
        }
        let name = input.ucd.metadata.name;
        let sideEffects = await this.configurator.sideEffects(this.ctx);
        if (flow) {
            name = `${flow.name} > ${name}`;
            if (sideEffects) {
                const snapshot = JSON.parse(JSON.stringify(Array.from(sideEffects.entries())));
                sideEffects = new Map(snapshot);
            }
        }
        const testResult = {
            name,
            out,
            sideEffects,
            status,
        };
        this.testResults.push(testResult);
        this.testSummary.counts[status] += 1;
        return testResult;
    }
    async finalize() {
        await this.serverManager.stop();
        const { appPath } = this.ctx;
        if (this.ucDefSourcesCheckerOutput) {
            await this.appDocsEmitter.exec({
                appPath,
                ucDefSourcesCheckerOutput: this.ucDefSourcesCheckerOutput,
            });
        }
        await this.simpleHTMLAppTestReportEmitter.exec({
            appPath,
            testResults: this.testResults,
            testSummary: this.testSummary,
        });
    }
    getCtx() {
        return this.ctx;
    }
    async init({ appPath, configurator, serverClientSettings, srcImporter, }) {
        this.configurator = configurator;
        this.safeSrcImporter = (path) => Promise.race([
            awaitForSrcImport(path),
            srcImporter(path),
        ]);
        const { ctx } = await this.appTesterCtxInitializer.exec({
            appPath,
            srcImporter: this.safeSrcImporter,
        });
        this.ctx = ctx;
        this.ctx.opts = await configurator.opts();
        await this.configurator.bindImplementations(this.ctx);
        await this.configurator.seed(this.ctx);
        await this.bindI18n();
        await this.bindServerClientSettings(serverClientSettings);
        await this.initI18n();
        await this.initServer();
    }
    async ucTestData(ucdRef) {
        const defaultASs = defaultUCAuthSetters();
        let asEntries = Object.entries(defaultASs);
        const asConfig = await this.configurator.authSettersConfig();
        if (asConfig) {
            const { add, exclude } = asConfig;
            if (exclude) {
                for (const asName of exclude) {
                    asEntries = asEntries.filter(([name]) => name !== asName);
                }
            }
            if (add) {
                asEntries.push(...Object.entries(add));
            }
        }
        const defaultIFs = defaultUCInputFillers();
        const ifEntries = Object.entries(defaultIFs);
        const specificIFs = await this.configurator.inputFillers();
        const specificIFsForUC = specificIFs?.get(ucdRef.name);
        if (specificIFsForUC) {
            ifEntries.push(...Object.entries(specificIFsForUC));
        }
        const data = [];
        for (const [authName, auth] of asEntries) {
            for (const [inputFillerName, inputFiller] of ifEntries) {
                data.push({
                    auth,
                    authName,
                    inputFiller,
                    inputFillerName,
                });
            }
        }
        return data;
    }
    async bindI18n() {
        const { appI18n, container } = this.ctx;
        const appLangCodes = Object.keys(appI18n);
        const coreI18n = {
            en: I18nEN,
            fr: I18nFR,
        };
        const productI18n = {
            en: {
                ...I18nEN,
            },
            fr: {
                ...I18nFR,
            },
        };
        for (const l of appLangCodes) {
            if (!(l in coreI18n)) {
                continue;
            }
            productI18n[l] = {
                ...productI18n[l],
                ...appI18n[l],
            };
        }
        container.rebind('I18n').toConstantValue(productI18n);
    }
    async bindServerClientSettings(serverClientSettings) {
        const { container } = this.ctx;
        const opts = optsAllSet(this.ctx.opts);
        const existingSettings = container.get('Settings');
        container.rebind('Settings').toConstantValue({
            ...existingSettings,
            ...serverClientSettings,
            logger_level: opts.logger_level,
        });
    }
    async initI18n() {
        await this.ctx.container.get('I18nManager').init();
    }
    async initServer() {
        const ucManager = this.ctx.container.get('UCManager');
        this.serverManager.overrideUCManager(ucManager);
        this.ucExecutor.overrideUCManager(ucManager);
        await this.serverManager.init();
        for await (const { source } of this.ctx.ucdRefs) {
            const keys = Object.keys(source);
            const [ucdKey] = keys;
            if (!ucdKey) {
                continue;
            }
            const ucd = source[ucdKey];
            const uc = this.ucBuilder.exec({
                appManifest: this.ctx.appManifest,
                auth: null,
                def: ucd,
            });
            await this.serverManager.mount(uc.appManifest, ucd, ucHTTPContract(uc));
        }
        await this.serverManager.warmUp();
        await this.serverManager.start();
    }
};
AppTester = __decorate([
    injectable(),
    __param(0, inject('AppDocsEmitter')),
    __param(1, inject(AppI18nChecker)),
    __param(2, inject(AppIndexChecker)),
    __param(3, inject(AppManifestChecker)),
    __param(4, inject(AppTesterCtxInitializer)),
    __param(5, inject('ServerManager')),
    __param(6, inject(SimpleHTMLAppTestReportEmitter)),
    __param(7, inject(UCBuilder)),
    __param(8, inject(UCDefChecker)),
    __param(9, inject(UCDefSourcesChecker)),
    __param(10, inject(UCExecutor)),
    __metadata("design:paramtypes", [Object, AppI18nChecker,
        AppIndexChecker,
        AppManifestChecker,
        AppTesterCtxInitializer, Object, SimpleHTMLAppTestReportEmitter,
        UCBuilder,
        UCDefChecker,
        UCDefSourcesChecker,
        UCExecutor])
], AppTester);
export { AppTester };
