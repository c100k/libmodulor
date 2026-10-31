import type { StringKeys } from '../utils/index.js';
import type { UCInputFieldDef, UCInputFieldValue } from './input-field.js';
/**
 * Base interface all the use case input interfaces must extend
 *
 * Each field is declared with its {@link DataType} only (e.g. `email: Email`).
 *
 * At runtime, an input field is always optional and can hold multiple values (see {@link UCInputFieldValue}).
 * Whether it's mandatory or repeatable is defined by its {@link UCInputFieldDef.cardinality}.
 */
export type UCInput = {};
export type UCInputUnwrapped<I extends UCInput | undefined> = {
    [K in keyof I]: NonNullable<I[K]>;
};
export type UCInputKey<I extends UCInput | undefined> = StringKeys<UCInputUnwrapped<I>>;
export type UCInputKeyDataType<I extends UCInput | undefined, K extends UCInputKey<I>> = NonNullable<UCInputUnwrapped<I>[K]>;
/**
 * Runtime values of a use case input, where each field is a {@link UCInputFieldValue}
 */
export type UCInputValue<I extends UCInput | undefined> = {
    [K in UCInputKey<I>]: UCInputFieldValue<UCInputKeyDataType<I, K>>;
};
export type UCInputPartial<I extends UCInput | undefined> = Partial<UCInputValue<I>>;
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
