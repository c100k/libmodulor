import { type NumIndex, type SearchQuery, type UIntQuantity, type UUID } from '../../../dt/index.js';
import type { UCInput, UCInputDef } from '../../input.js';
import type { UCInputFieldValue } from '../../input-field.js';
export interface ListInput extends UCInput {
    id: UCInputFieldValue<UUID>;
    limit: UCInputFieldValue<UIntQuantity>;
    offset: UCInputFieldValue<NumIndex>;
    q: UCInputFieldValue<SearchQuery>;
}
export declare const ListInputDef: UCInputDef<ListInput>;
