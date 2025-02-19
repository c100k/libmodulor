import type { StringKeys } from '../utils/index.js';
import type { UCInputFieldDef } from './input-field.js';
/**
 * Base interface all the use case input interfaces must extend
 */
export interface UCInput {
}
/**
 * Definition of a use case input
 */
export interface UCInputDef<I extends UCInput> {
    /**
     * This is useful when you want to render a given field only after its dependent fields have been set.
     */
    dependencies?: Partial<Record<StringKeys<I>, StringKeys<I>[]>>;
    /**
     * It must follow strictly the shape of the corresponding {@link UCInput} with fields sorted alphabetically.
     */
    fields: Record<StringKeys<I>, UCInputFieldDef<any>>;
    /**
     * By default, the fields are displayed in the same order as in {@link fields} (i.e. alphabetically).
     *
     * You can customize this by specifying the desired order here.
     *
     * For example, when rendering a form, this is used.
     */
    order?: StringKeys<I>[];
    /**
     * Cross-field validation rules
     *
     * For example, if you want the user to provide `a` OR `b` but not both.
     */
    validation?: {
        or?: StringKeys<I>[];
    };
}
