import { type UUID } from '../../../dt/index.js';
import type { UCInput, UCInputDef } from '../../input.js';
export interface AggregateInput extends UCInput {
    id: UUID;
}
export declare const AggregateInputDef: UCInputDef<AggregateInput>;
