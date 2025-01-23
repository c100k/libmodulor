import type { FilePath } from '../../dt/index.js';
import type { FSManager } from '../../std/index.js';
import type { AppTestSuiteRunner, Input } from '../workers/AppTestSuiteRunner.js';
export declare class VitestAppTestSuiteRunner implements AppTestSuiteRunner {
    private fsManager;
    constructor(fsManager: FSManager);
    exec({ appPath, skipCoverage, updateSnapshots, }: Input): Promise<void>;
    coverageReportEntrypointPath(appPath: FilePath): Promise<FilePath>;
    private coverageReportPath;
}
