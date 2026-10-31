import type { AppName } from '../../../../app/index.js';
import { type UCDef, type UCInputFieldValue } from '../../../../uc/index.js';
import { type AppInput } from '../lib/io.js';
export interface CreateAppInput extends AppInput {
    appName: UCInputFieldValue<AppName>;
}
export declare const CreateAppUCD: UCDef<CreateAppInput>;
