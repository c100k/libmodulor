import { type UUID } from '../../../dt/index.js';
import { type UCInputFieldValue } from '../../input-field.js';
import type { UCInput, UCInputDef } from '../../input.js';
export interface AggregateInput extends UCInput {
    id: UCInputFieldValue<UUID>;
}
export declare const AggregateInputDef: UCInputDef<AggregateInput>;
