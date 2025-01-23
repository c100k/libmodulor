import type { UIntQuantity } from '../dt/index.js';
import type { StringKeys } from '../utils/index.js';
import type { UCDef } from './def.js';
import type { ListInput } from './io/input/ListInput.js';
import type { UCOPILayout } from './opi-layout.js';
import type { UCOPIBase } from './opi.js';
import type { UCOutputFieldDef } from './output-field.js';
export interface UCOutputPart<OPI extends UCOPIBase> {
    items: OPI[];
    pagination?: ListInput;
    total: UIntQuantity;
}
export type UCOutputPartDefFields<OPI extends UCOPIBase> = Record<StringKeys<OPI>, UCOutputFieldDef<OPI, any>>;
export interface UCOutputPartDef<OPI extends UCOPIBase> {
    fields: Omit<UCOutputPartDefFields<OPI>, 'id'>;
    layout?: UCOPILayout<OPI>;
    order?: StringKeys<OPI>[];
    related?: {
        global: UCDef<any, any, any>[];
        perItem: UCDef<any, any, any>[];
    };
}
export interface UCOutputPartWording {
    empty: string | null;
    label: string | null;
}
