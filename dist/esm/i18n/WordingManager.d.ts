import type { DataType, TBase, TName } from '../dt/index.js';
import type { ProductWording } from '../product/index.js';
import type { I18nManager } from '../std/index.js';
import type { UCClientConfirmConfig, UCDef, UCExecState, UCFieldKey, UCInput, UCInputField, UCName, UCOPIBase, UCOutputPartIdx, UCOutputPartWording, UCWording } from '../uc/index.js';
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
