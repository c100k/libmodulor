import { type NumIndex, type SearchQuery, type UIntQuantity, type UUID } from '../../../dt/index.js';
import type { UCInput, UCInputDef } from '../../input.js';
export interface ListInput extends UCInput {
    id: UUID;
    limit: UIntQuantity;
    offset: NumIndex;
    q: SearchQuery;
}
export declare const ListInputDef: UCInputDef<ListInput>;
