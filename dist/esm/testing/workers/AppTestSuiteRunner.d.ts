import type { FilePath } from '../../dt/index.js';
import type { Worker } from '../../std/index.js';
export interface Input {
    appPath: FilePath;
    skipCoverage: boolean;
    updateSnapshots: boolean;
}
export interface AppTestSuiteRunner extends Worker<Input, Promise<void>> {
    coverageReportEntrypointPath(appPath: FilePath): Promise<FilePath>;
}
