import { type ReactElement } from 'react';
import type { DataType } from '../../dt/index.js';
import type { UCInputField } from '../../uc/index.js';
export interface Props<T extends DataType> {
    field: UCInputField<T>;
}
export declare function UCFormFieldLabel<T extends DataType>({ field, }: Props<T>): ReactElement;
