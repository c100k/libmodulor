import type { ReactElement } from 'react';
import type { DataType } from '../../../dt/index.js';
import type { UCInput, UCInputField, UCInputFieldChangeOperator, UCInputFieldValue, UCOPIBase } from '../../../uc/index.js';
import type { UCPanelCtx, UCPanelOnSubmit } from './panel.js';
export type UCFormFieldControlOnChange<T extends DataType = DataType> = (f: UCInputField<T>, op: UCInputFieldChangeOperator, v: UCInputFieldValue<T>) => void;
export type UCFormProps<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> = UCPanelCtx<I, OPI0, OPI1> & {
    onChange: UCFormFieldControlOnChange;
    onSubmit: UCPanelOnSubmit;
};
export type RenderUCForm<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> = (props: UCFormProps<I, OPI0, OPI1>) => ReactElement;
