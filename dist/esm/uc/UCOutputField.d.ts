import type { DataType } from '../dt/index.js';
import type { StringKeys } from '../utils/index.js';
import type { UCOPIBase } from './opi.js';
import type { UCOutputFieldDef } from './output-field.js';
export declare class UCOutputField<OPI extends UCOPIBase, T extends DataType> {
    key: StringKeys<OPI>;
    def: UCOutputFieldDef<OPI, T>;
    constructor(key: StringKeys<OPI>, def: UCOutputFieldDef<OPI, T>);
}
