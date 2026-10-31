import type { AppName } from '../../../../app/index.js';
import { type UCDef } from '../../../../uc/index.js';
import { type AppInput } from '../lib/io.js';
export interface CreateAppInput extends AppInput {
    appName: AppName;
}
export declare const CreateAppUCD: UCDef<CreateAppInput>;
