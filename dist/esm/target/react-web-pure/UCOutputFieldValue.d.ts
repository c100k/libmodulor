import { type ReactElement } from 'react';
import type { DataType } from '../../dt/index.js';
import type { UCOPIBase } from '../../uc/index.js';
import { type Props } from '../lib/react/UCOutputFieldValueFragment.js';
export declare function UCOutputFieldValue<OPI extends UCOPIBase, T extends DataType>({ className, ...propsWithoutClassName }: Props<OPI, T>): ReactElement;
