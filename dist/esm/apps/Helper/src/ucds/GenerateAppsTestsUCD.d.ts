import { type FilePath, type HostPort, type UIntDuration } from '../../../../dt/index.js';
import { type UCDef, type UCInputFieldValue } from '../../../../uc/index.js';
import { type AppInput } from '../lib/io.js';
declare const DEP_MAPPING_SEP = "::";
type DepMapping = `${FilePath}${typeof DEP_MAPPING_SEP}${FilePath}`;
export interface GenerateAppsTestsInput extends AppInput {
    depsMapping: UCInputFieldValue<DepMapping>;
    monkeyTestingTimeoutInMs: UCInputFieldValue<UIntDuration>;
    serverPortRangeStart: UCInputFieldValue<HostPort>;
}
export declare const GenerateAppsTestsUCD: UCDef<GenerateAppsTestsInput>;
export {};
