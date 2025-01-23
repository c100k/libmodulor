import type { FSManager } from '../../std/index.js';
import type { AppTestSuiteEmitter, Input, Output } from '../workers/AppTestSuiteEmitter.js';
export declare class VitestAppTestSuiteEmitter implements AppTestSuiteEmitter {
    private fsManager;
    constructor(fsManager: FSManager);
    exec({ appPath, depsMapping, idx, monkeyTestingTimeoutInMs, serverPortRangeStart, }: Input): Promise<Output>;
}
