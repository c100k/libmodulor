import { type ReactElement } from 'react';
import type { DataType } from '../../dt/index.js';
import { type UCFormFieldProps } from '../lib/react/form.js';
export declare function UCFormField<T extends DataType>({ disabled, execState, f, onChange: onChangeBase, only, }: UCFormFieldProps<T>): ReactElement;
