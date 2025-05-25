import type { ReactElement } from 'react';
import type { DataType, ErrorMessage } from '../../../dt/index.js';
import type { I18nManager } from '../../../std/index.js';
import type { UCInput, UCInputField, UCInputFieldChangeOperator, UCInputFieldValue, UCOPIBase } from '../../../uc/index.js';
import type { Stylable } from './common.js';
import type { UCPanelCtx, UCPanelOnSubmit, UCPanelState } from './panel.js';
export type UCFormFieldControlOnChange<T extends DataType = DataType> = (f: UCInputField<T>, op: UCInputFieldChangeOperator, v: UCInputFieldValue<T>) => void;
export type UCFormFieldControlProps<T extends DataType> = Stylable & UCPanelState & {
    errMsg?: ErrorMessage | null;
    f: UCInputField<T>;
    onChange: UCFormFieldControlOnChange<T>;
};
export type UCFormFieldDescProps<T extends DataType> = Stylable & {
    f: UCInputField<T>;
};
export type UCFormFieldErrProps = Stylable & {
    errMsg?: ErrorMessage | null;
};
export type UCFormFieldLabelProps<T extends DataType> = Stylable & {
    f: UCInputField<T>;
};
export declare const UC_FORM_FIELD_ELEMENTS: readonly ["control", "desc", "err", "label"];
export type UCFormFieldElement = (typeof UC_FORM_FIELD_ELEMENTS)[number];
export type UCFormFieldProps<T extends DataType> = Stylable & UCFormFieldControlProps<T> & {
    only?: UCFormFieldElement[];
};
export type UCFormProps<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> = Stylable & UCPanelCtx<I, OPI0, OPI1> & {
    onChange: UCFormFieldControlOnChange;
    onSubmit: UCPanelOnSubmit;
};
export type UCFormSubmitControlProps<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> = Stylable & UCPanelCtx<I, OPI0, OPI1> & {
    onPress?: () => Promise<void>;
};
export type RenderUCForm<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> = (props: UCFormProps<I, OPI0, OPI1>) => ReactElement;
export declare function validateFormField<T extends DataType = DataType>(i18nManager: I18nManager, f: UCInputField<T>, v: UCInputFieldValue<T>): ErrorMessage | null;
