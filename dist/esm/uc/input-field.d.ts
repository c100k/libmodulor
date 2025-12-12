import type { DataType, TBase, UIntQuantity } from '../dt/index.js';
import type { EnumOf } from '../utils/index.js';
import type { UCFieldKey } from './def.js';
import type { Value } from './value.js';
export declare const UCInputFieldFillingMode: {
    /**
     * Set programmatically on behalf of the user (e.g. a foreign key id for a given object)
     */
    readonly AUTO_PRE: "AUTO_PRE";
    /**
     * Set manually by the user (e.g. a form field, a cli flag, etc.)
     */
    readonly MANUAL: "MANUAL";
};
export type UCInputFieldFillingMode = EnumOf<typeof UCInputFieldFillingMode>;
export interface UCInputFieldDefCardinality {
    max?: UIntQuantity;
    min?: UIntQuantity;
}
/**
 * Definition of a use case input field
 */
export interface UCInputFieldDef<T extends DataType> {
    /**
     * A field can have 0, 1 or n values. This field defines the rules.
     *
     * @defaultValue { max: 1, min: 1 } => the user must absolutely provide one value only
     *
     * @example { max: 5, min: 0 } => the user must provide at most 5 values or none
     * @example { min: 0 } => the user must provide 0 values or none
     */
    cardinality?: UCInputFieldDefCardinality;
    /**
     * @defaultValue {@link UCInputFieldFillingMode.MANUAL}
     */
    fillingMode?: UCInputFieldFillingMode;
    /**
     * @defaultValue false
     */
    readOnly?: boolean;
    /**
     * Some types are automatically considered sensitive (e.g. {@link Password}).
     *
     * But you can force the behavior with this setting for any other type of field.
     *
     * @defaultValue false
     */
    sensitive?: boolean;
    /**
     * When you persist a use case, all the input fields are automatically persisted as well.
     *
     * Sometimes this is not wanted. Setting the field as transient will exclude it from being persisted.
     *
     * @defaultValue false
     */
    transient?: boolean;
    type: TBase<T>;
}
export type UCInputFieldValue<T> = Value<T>;
export type UCInputFieldValueUnwrapped<T> = T extends UCInputFieldValue<infer U> ? U : never;
export declare function ucifExamples<T extends DataType>(def: UCInputFieldDef<T>): T[] | undefined;
export declare function ucifHint<T extends DataType>(def: UCInputFieldDef<T>): string | undefined;
/**
 * The unique id associated to this field
 *
 * By default it would return `inputfield-myField`.
 * If you have the same field multiple times in one context (e.g. a web page), pass a unique element to the `prefix`.
 * For example `uc1-inputfield-myField` and `uc2-inputfield-myField`
 *
 * @param prefix
 * @param separator
 * @returns
 */
export declare function ucifId(key: UCFieldKey, prefix?: string, separator?: string): string;
export declare function ucifIsMandatory<T extends DataType>(def: UCInputFieldDef<T>): boolean;
export declare function ucifRepeatability<T extends DataType>(def: UCInputFieldDef<T>): [boolean, UIntQuantity];
export declare function ucifIsSensitive<T extends DataType>(def: UCInputFieldDef<T>): boolean;
export declare function ucifMustBeFilledManually<T extends DataType>(def: UCInputFieldDef<T>, opts?: {
    noContext: boolean;
}): boolean;
