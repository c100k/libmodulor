import type { AppName } from '../../../../app/index.js';
import { type UCDef, type UCInputFieldValue, type UCName } from '../../../../uc/index.js';
import { type AppInput } from '../lib/io.js';
export interface CreateUCInput extends AppInput {
    appName: UCInputFieldValue<AppName>;
    ucName: UCInputFieldValue<UCName>;
}
export declare const CreateUCUCD: UCDef<CreateUCInput>;
