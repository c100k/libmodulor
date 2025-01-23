import type { FilePath } from '../../dt/index.js';
import type { FSManager } from '../../std/index.js';
import type { AppTestReportEmitter, Input, Output } from '../workers/AppTestReportEmitter.js';
export declare class SimpleHTMLAppTestReportEmitter implements AppTestReportEmitter {
    private fsManager;
    constructor(fsManager: FSManager);
    exec({ appPath, testResults, testSummary, }: Input): Promise<Output>;
    entrypointPath(appPath: FilePath): Promise<FilePath>;
    private reportPath;
}
