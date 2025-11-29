import type { FilePath } from '../../dt/index.js';
import type { Worker } from '../../std/index.js';
import type { UCName } from '../../uc/index.js';
export interface Input {
    appPath: FilePath;
    only: UCName | null;
    skipCoverage: boolean;
    updateSnapshots: boolean;
}
export interface AppTestSuiteRunner extends Worker<Input, Promise<void>> {
    coverageReportEntrypointPath(appPath: FilePath): Promise<FilePath>;
}
