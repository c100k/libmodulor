import type { DataType, TBase } from '../dt/index.js';
import type { StringKeys } from '../utils/index.js';
import type { UCOPIBase } from './opi.js';
export interface UCOutputFieldDef<OPI extends UCOPIBase, T extends DataType> {
    linksTo?: StringKeys<OPI>;
    totalType?: 'sum';
    type: TBase<T>;
}
