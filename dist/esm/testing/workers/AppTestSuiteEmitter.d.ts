import type { FilePath, HostPort, JSONString, NumIndex, UIntDuration, UIntQuantity } from '../../dt/index.js';
import type { Worker } from '../../std/index.js';
import type { AppTesterExecName, AppTesterExecStatus } from '../exec.js';
export interface AppTestSuiteSummary {
    counts: Record<AppTesterExecStatus, UIntQuantity>;
}
export type AppTestSnapshot = {
    default: Record<AppTesterExecName, `\n"${JSONString}"\n`>;
};
export interface Input {
    appPath: FilePath;
    depsMapping?: Map<string, string>;
    idx: NumIndex;
    monkeyTestingTimeoutInMs: UIntDuration;
    serverPortRangeStart: HostPort;
}
export interface Output {
    outPath: FilePath;
}
export interface AppTestSuiteEmitter extends Worker<Input, Promise<Output>> {
}
