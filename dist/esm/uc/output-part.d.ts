import type { UIntQuantity } from '../dt/index.js';
import type { StringKeys } from '../utils/index.js';
import type { UCDef } from './def.js';
import type { ListInput } from './io/input/ListInput.js';
import type { UCOPIBase } from './opi.js';
import type { UCOPILayout } from './opi-layout.js';
import type { UCOutputFieldDef } from './output-field.js';
export interface UCOutputPart<OPI extends UCOPIBase> {
    /**
     * The items making the part
     */
    items: OPI[];
    /**
     * Pagination to pass to the next call of the use case.
     */
    pagination?: ListInput;
    /**
     * The total number of items regardless pagination.
     */
    total: UIntQuantity;
}
export type UCOutputPartDefFields<OPI extends UCOPIBase> = Record<StringKeys<OPI>, UCOutputFieldDef<OPI, any>>;
/**
 * Definition of a use case output part
 */
export interface UCOutputPartDef<OPI extends UCOPIBase> {
    /**
     * It must follow strictly the shape of the corresponding {@link UCOPIBase} with fields sorted alphabetically.
     */
    fields: Omit<UCOutputPartDefFields<OPI>, 'id'>;
    layout?: UCOPILayout<OPI>;
    /**
     * By default, the fields are displayed in the same order as in {@link fields} (i.e. alphabetically).
     *
     * You can customize this by specifying the desired order here.
     *
     * For example, when rendering a card with the data, this is used.
     */
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
