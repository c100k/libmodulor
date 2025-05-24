import type { UC, UCExecState, UCInput, UCOPIBase, UCOutputReader } from '../../../uc/index.js';
import type { UseActionExec, UseActionOnError } from './useAction.js';
export type UCPanelOnDone<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> = (ucor: UCOutputReader<I, OPI0, OPI1>) => Promise<void>;
export type UCPanelOnError = UseActionOnError;
export type UCPanelOnInit<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> = (uc: UC<I, OPI0, OPI1>) => Promise<void>;
export type UCPanelOnStartSubmitting = () => Promise<void>;
export type UCPanelOnSubmit = UseActionExec;
export interface UCPanelState {
    clearAfterExec?: boolean;
    disabled: boolean;
    execState: UCExecState;
}
export type UCPanelCtx<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> = UCPanelState & {
    uc: UC<I, OPI0, OPI1>;
};
