import type { FilePath, FreeTextShort, HostPort, JSONString, NumIndex, SemanticsVariant, UIntDuration, UIntQuantity } from '../../dt/index.js';
import type { Worker } from '../../std/index.js';
import type { UCInput, UCOPIBase } from '../../uc/index.js';
import type { ExtractStrict } from '../../utils/index.js';
import type { AppTesterConfiguratorSideEffects } from '../AppTesterConfigurator.js';
import type { UCExecutorExecOutput } from './UCExecutor.js';
export type AppTestName = FreeTextShort;
export type AppTestSuiteStatus = ExtractStrict<SemanticsVariant, 'danger' | 'success' | 'warning'>;
export interface AppTestSuiteTestResult<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> {
    name: AppTestName;
    out: UCExecutorExecOutput<I, OPI0, OPI1>;
    sideEffects: AppTesterConfiguratorSideEffects | undefined;
    status: AppTestSuiteStatus;
}
export interface AppTestSuiteSummary {
    counts: Record<AppTestSuiteStatus, UIntQuantity>;
}
export type AppTestSnapshot = {
    default: Record<AppTestName, `\n"${JSONString}"\n`>;
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
