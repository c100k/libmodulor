import { type ReactElement } from 'react';
import type { DataType } from '../../../dt/index.js';
import type { UCOPIBase, UCOutputField } from '../../../uc/index.js';
export interface Props<OPI extends UCOPIBase, T extends DataType> {
    field: UCOutputField<OPI, T>;
    value: T;
}
export declare function UCOutputFieldValueFragment<OPI extends UCOPIBase, T extends DataType>({ field, value }: Props<OPI, T>): ReactElement;
