import { type DirPath } from '../../../../dt/index.js';
import type { UCInput, UCInputDef } from '../../../../uc/index.js';
export interface AppInput extends UCInput {
    appsPath: DirPath;
}
export declare const AppInputFieldsDef: UCInputDef<AppInput>['fields'];
export interface ProductInput extends UCInput {
    productsPath: DirPath;
}
export declare const ProductInputFieldsDef: UCInputDef<ProductInput>['fields'];
