import type { AppName } from '../../../../app/index.js';
import { type UCDef, type UCName } from '../../../../uc/index.js';
import { type AppInput } from '../lib/io.js';
export interface TestAppInput extends AppInput {
    appName: AppName;
    only: UCName;
    updateSnapshots: boolean;
}
export declare const TestAppUCD: UCDef<TestAppInput>;
