import type { ReactElement } from 'react';
import type { DataType } from '../../../dt/index.js';
import type { UCOPIBase, UCOutputField } from '../../../uc/index.js';
export interface Props<OPI extends UCOPIBase, T extends DataType> {
    f: UCOutputField<OPI, T>;
    value: T;
}
export declare function UCOutputFieldValueFragment<OPI extends UCOPIBase, T extends DataType>({ f, value }: Props<OPI, T>): ReactElement;
