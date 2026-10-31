import type { AppName } from '../../../../app/index.js';
import { type UCDef, type UCName } from '../../../../uc/index.js';
import { type AppInput } from '../lib/io.js';
export interface CreateUCInput extends AppInput {
    appName: AppName;
    ucName: UCName;
}
export declare const CreateUCUCD: UCDef<CreateUCInput>;
