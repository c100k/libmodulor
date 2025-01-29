import { type ReactElement } from 'react';
import type { DataType } from '../../dt/index.js';
import { type Props as FormFieldControlProps } from './UCFormFieldControl.js';
import { type Props as FormFieldLabelProps } from './UCFormFieldLabel.js';
declare const ELEMENTS: readonly ["control", "desc", "err", "label"];
type Element = (typeof ELEMENTS)[number];
type Props<T extends DataType> = FormFieldControlProps<T> & FormFieldLabelProps<T> & {
    only?: Element[];
};
export declare function UCFormField<T extends DataType>({ disabled, execState, field, onChange: onChangeBase, only, }: Props<T>): ReactElement;
export {};
