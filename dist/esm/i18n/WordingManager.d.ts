import type { DataType, TBase, TName } from '../dt/index.js';
import type { ProductWording } from '../product/index.js';
import type { I18nManager } from '../std/index.js';
import type { UCClientConfirmConfig, UCDef, UCExecState, UCFieldKey, UCInput, UCInputField, UCName, UCOPIBase, UCOutputPartIdx, UCOutputPartWording, UCWording } from '../uc/index.js';
/**
 * A key to translate
 *
 *   - uc_CreateX_desc, uc_CreateX_label
 *   - ucif_name_desc, uc_name_label, uc_isEnabled_desc, uc_isEnabled_label
 *
 * NOTE : The choice has been made to consider the input fields as "global".
 * Which means, their key is not prefixed by the use case name (e.g. ucif_CreateX_ucif_name_desc).
 * This has multiple advantages :
 *
 *   - The same field present in multiple use cases will be automatically translated
 *   - It gives more consistency through the app with the same thing always named the same way
 *
 * One might argue that a label can be different for "name" in "CreateX" and "CreateY".
 * In this case, we consider that the input field shouldn't be named "name" in both places.
 */
export type WordingManagerKey = `dt_${TName}_${string}_${keyof UCWording}` | `p_${keyof ProductWording}` | `uc_${UCName}_${keyof UCWording}` | `uc_${UCName}_client_confirm_${keyof UCClientConfirmConfig}` | `uc_${UCName}_i_submit_${UCExecState}` | `uc_${UCName}_op_${UCOutputPartIdx}_${keyof UCOutputPartWording}` | `ucif_${UCFieldKey}_${keyof UCWording}` | `ucof_${UCFieldKey}_${keyof UCWording}`;
export declare class WordingManager {
    private i18nManager;
    constructor(i18nManager: I18nManager);
    dt<DT extends DataType>(type: TBase<DT>): UCWording;
    p(): ProductWording;
    uc<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined>(def: UCDef<I, OPI0, OPI1>): UCWording;
    ucClientConfirm<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined>(def: UCDef<I, OPI0, OPI1>): UCClientConfirmConfig;
    ucISubmit<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined>(def: UCDef<I, OPI0, OPI1>, state: UCExecState, ellipsis?: string): string;
    ucif<T extends DataType>(field: UCInputField<T>): UCWording;
    ucof(key: UCFieldKey): UCWording;
    ucop<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined>(def: UCDef<I, OPI0, OPI1>, idx: UCOutputPartIdx): UCOutputPartWording;
    private t;
    private tOr;
    private tOrNull;
}
