import type { FilePath } from '../../dt/index.js';
import type { Worker } from '../../std/index.js';
import type { AppTestSuiteSummary, AppTestSuiteTestResult } from './AppTestSuiteEmitter.js';
export interface Input {
    appPath: FilePath;
    testResults: AppTestSuiteTestResult[];
    testSummary: AppTestSuiteSummary;
}
export interface Output {
    outPath: FilePath;
}
export interface AppTestReportEmitter extends Worker<Input, Promise<Output>> {
    entrypointPath(appPath: FilePath): Promise<FilePath>;
}
