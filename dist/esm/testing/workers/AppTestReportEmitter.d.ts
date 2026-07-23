import type { FilePath } from '../../dt/index.js';
import type { Worker } from '../../std/index.js';
import type { AppTesterExec } from '../exec.js';
import type { AppTestSuiteSummary } from './AppTestSuiteEmitter.js';
export interface Input {
    appPath: FilePath;
    testResults: AppTesterExec[];
    testSummary: AppTestSuiteSummary;
}
export interface Output {
    outPath: FilePath;
}
export interface AppTestReportEmitter extends Worker<Input, Promise<Output>> {
    entrypointPath(appPath: FilePath): Promise<FilePath>;
}
