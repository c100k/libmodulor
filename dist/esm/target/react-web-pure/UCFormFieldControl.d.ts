import { type ReactElement } from 'react';
import type { DataType } from '../../dt/index.js';
import type { UCFormFieldControlProps } from '../lib/react/form.js';
export declare function UCFormFieldControl<T extends DataType>({ className, errMsg, execState, f, onChange: onChangeBase, }: UCFormFieldControlProps<T>): ReactElement;
