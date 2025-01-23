import type { StringKeys } from '../utils/index.js';
import type { UCInputFieldDef } from './input-field.js';
export interface UCInput {
}
export interface UCInputDef<I extends UCInput> {
    dependencies?: Partial<Record<StringKeys<I>, StringKeys<I>[]>>;
    fields: Record<StringKeys<I>, UCInputFieldDef<any>>;
    order?: StringKeys<I>[];
    validation?: {
        or?: StringKeys<I>[];
    };
}
