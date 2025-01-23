import { type ReactElement } from 'react';
import type { DataType, ErrorMessage } from '../../dt/index.js';
import { type UCInputField } from '../../uc/index.js';
import type { UCFormFieldControlOnChange } from '../lib/react/form.js';
import type { UCPanelState } from '../lib/react/panel.js';
export type Props<T extends DataType> = UCPanelState & {
    errMsg?: ErrorMessage | null;
    field: UCInputField<T>;
    onChange: UCFormFieldControlOnChange<T>;
};
export declare function UCFormFieldControl<T extends DataType>({ disabled, errMsg, execState, field, onChange: onChangeBase, }: Props<T>): ReactElement;
