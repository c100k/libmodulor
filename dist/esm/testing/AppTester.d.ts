import type { FilePath } from '../dt/index.js';
import type { ServerClientManagerSettings } from '../target/lib/client/ServerClientManager.js';
import type { ServerManager } from '../target/lib/server/ServerManager.js';
import { type UCAuth, UCBuilder, type UCDef, type UCInput, type UCName, type UCOPIBase } from '../uc/index.js';
import type { SrcImporter } from '../utils/index.js';
import type { AppTesterConfigurator } from './AppTesterConfigurator.js';
import type { AppTesterCtx, AppTesterUCDRef } from './ctx.js';
import type { AppTesterFlow, AppTesterFlowExecOutput } from './flow.js';
import { SimpleHTMLAppTestReportEmitter } from './impl/SimpleHTMLAppTestReportEmitter.js';
import { type UCInputFiller } from './uc-input.js';
import type { AppDocsEmitter } from './workers/AppDocsEmitter.js';
import { AppTesterCtxInitializer } from './workers/AppTesterCtxInitializer.js';
import type { AppTestSuiteTestResult } from './workers/AppTestSuiteEmitter.js';
import { AppFolderChecker } from './workers/checkers/AppFolderChecker.js';
import { AppI18nChecker } from './workers/checkers/AppI18nChecker.js';
import { AppIndexChecker } from './workers/checkers/AppIndexChecker.js';
import { AppManifestChecker } from './workers/checkers/AppManifestChecker.js';
import { UCDefChecker } from './workers/checkers/UCDefChecker.js';
import { UCDefSourcesChecker } from './workers/checkers/UCDefSourcesChecker.js';
import { UCExecutor, type UCExecutorExecOutput, type Input as UCExecutorInput } from './workers/UCExecutor.js';
export interface AppTesterInitArgs {
    appPath: FilePath;
    configurator: AppTesterConfigurator;
    serverClientSettings: ServerClientManagerSettings;
    srcImporter: SrcImporter;
}
export interface AppTesterUCTestData<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> {
    auth: UCAuth | null;
    authName: string;
    inputFiller: UCInputFiller<I, OPI0, OPI1>;
    inputFillerName: string;
}
export declare class AppTester {
    private appDocsEmitter;
    private appFolderChecker;
    private appI18nChecker;
    private appIndexChecker;
    private appManifestChecker;
    private appTesterCtxInitializer;
    private serverManager;
    private simpleHTMLAppTestReportEmitter;
    private ucBuilder;
    private ucDefChecker;
    private ucDefSourcesChecker;
    private ucExecutor;
    private configurator;
    private ctx;
    /**
     * We use a "safe" one to avoid any "infinite loop" while trying to import/resolve a file.
     * This can happen in case of circular dependencies for example.
     */
    private safeSrcImporter;
    private ucds;
    private testResults;
    private testSummary;
    private ucDefSourcesCheckerOutput;
    constructor(appDocsEmitter: AppDocsEmitter, appFolderChecker: AppFolderChecker, appI18nChecker: AppI18nChecker, appIndexChecker: AppIndexChecker, appManifestChecker: AppManifestChecker, appTesterCtxInitializer: AppTesterCtxInitializer, serverManager: ServerManager, simpleHTMLAppTestReportEmitter: SimpleHTMLAppTestReportEmitter, ucBuilder: UCBuilder, ucDefChecker: UCDefChecker, ucDefSourcesChecker: UCDefSourcesChecker, ucExecutor: UCExecutor);
    checkAppFolder(): Promise<void>;
    checkAppI18n(): Promise<void>;
    checkAppIndex(): Promise<void>;
    checkAppManifest(): Promise<void>;
    checkUCDSources(): Promise<void>;
    checkUC(ucdRef: AppTesterUCDRef): Promise<void>;
    execFlow(flow: AppTesterFlow): Promise<AppTesterFlowExecOutput>;
    execMonkeyTest<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined>(ucd: UCDef<I, OPI0, OPI1>, input: I): Promise<UCExecutorExecOutput<I, OPI0, OPI1>>;
    execUC<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined>(input: Omit<UCExecutorInput<I, OPI0, OPI1>, 'appManifest'>, flow?: AppTesterFlow): Promise<AppTestSuiteTestResult<I, OPI0, OPI1>>;
    finalize(): Promise<void>;
    getCtx(): AppTesterCtx;
    getUCD<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined>(ucName: UCName): UCDef<I, OPI0, OPI1>;
    init({ appPath, configurator, serverClientSettings, srcImporter, }: AppTesterInitArgs): Promise<void>;
    initForUCExec(): Promise<void>;
    ucTestData(ucdRef: AppTesterUCDRef): Promise<AppTesterUCTestData[]>;
    private bindI18n;
    private bindServerClientSettings;
    private initI18n;
    private initServer;
}
