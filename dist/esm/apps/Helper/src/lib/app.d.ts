import { type DirPath } from '../../../../dt/index.js';
import type { UCInput, UCInputDef, UCInputFieldValue } from '../../../../uc/index.js';
export interface AppInput extends UCInput {
    appsPath: UCInputFieldValue<DirPath>;
}
export declare const AppInputFieldsDef: UCInputDef<AppInput>['fields'];
