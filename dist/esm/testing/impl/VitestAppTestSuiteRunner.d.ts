import type { FilePath } from '../../dt/index.js';
import type { FSManager, ShellCommandExecutor } from '../../std/index.js';
import type { AppTestSuiteRunner, Input } from '../workers/AppTestSuiteRunner.js';
export declare class VitestAppTestSuiteRunner implements AppTestSuiteRunner {
    private fsManager;
    private shellCommandExecutor;
    constructor(fsManager: FSManager, shellCommandExecutor: ShellCommandExecutor);
    exec({ appPath, skipCoverage, updateSnapshots, }: Input): Promise<void>;
    coverageReportEntrypointPath(appPath: FilePath): Promise<FilePath>;
    private coverageReportPath;
}
