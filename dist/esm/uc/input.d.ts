import type { DataType } from '../dt/index.js';
import type { StringKeys } from '../utils/index.js';
import type { UCInputFieldDef, UCInputFieldValue, UCInputFieldValueUnwrapped } from './input-field.js';
/**
 * Base interface all the use case input interfaces must extend
 */
export type UCInput = {};
export type UCInputUnwrapped<I extends UCInput | undefined> = {
    [K in keyof I]: UCInputFieldValueUnwrapped<I[K]>;
};
export type UCInputKey<I extends UCInput | undefined> = StringKeys<UCInputUnwrapped<I>>;
export type UCInputPartial<I extends UCInput | undefined> = Partial<Record<UCInputKey<I>, UCInputFieldValue<DataType>>>;
export type UCInputKeyDataType<I extends UCInput | undefined, K extends UCInputKey<I>> = NonNullable<UCInputUnwrapped<I>[K]>;
/**
 * Definition of a use case input
 */
export interface UCInputDef<I extends UCInput> {
    /**
     * This is useful when you want to render a given field only after its dependent fields have been set.
     */
    dependencies?: Partial<Record<UCInputKey<I>, UCInputKey<I>[]>>;
    /**
     * It must follow strictly the shape of the corresponding {@link UCInput} with fields sorted alphabetically.
     */
    fields: Record<UCInputKey<I>, UCInputFieldDef<any>>;
    /**
     * By default, the fields are displayed in the same order as in {@link fields} (i.e. alphabetically).
     *
     * You can customize this by specifying the desired order here.
     *
     * For example, when rendering a form, this is used.
     */
    order?: UCInputKey<I>[];
    /**
     * Cross-field validation rules
     *
     * For example, if you want the user to provide `a` OR `b` but not both.
     */
    validation?: {
        or?: UCInputKey<I>[];
    };
}
