import type { AppName } from '../../../../app/index.js';
import { type UCDef, type UCInputFieldValue, type UCName } from '../../../../uc/index.js';
import { type AppInput } from '../lib/io.js';
export interface TestAppInput extends AppInput {
    appName: UCInputFieldValue<AppName>;
    only: UCInputFieldValue<UCName>;
    skipCoverage: UCInputFieldValue<boolean>;
    updateSnapshots: UCInputFieldValue<boolean>;
}
export declare const TestAppUCD: UCDef<TestAppInput>;
