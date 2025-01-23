import type { DataType, TBase, UIntQuantity } from '../dt/index.js';
import type { UCFieldKey } from './def.js';
import type { Value } from './value.js';
export declare enum UCInputFieldChangeOperator {
    ADD = "ADD",
    REMOVE = "REMOVE",
    RESET = "RESET",
    SET = "SET"
}
export declare enum UCInputFieldFillingMode {
    AUTO_PRE = "AUTO_PRE",
    MANUAL = "MANUAL"
}
export interface UCInputFieldDefCardinality {
    max?: UIntQuantity;
    min?: UIntQuantity;
}
export interface UCInputFieldDef<T extends DataType> {
    cardinality?: UCInputFieldDefCardinality;
    fillingMode?: UCInputFieldFillingMode;
    readOnly?: boolean;
    sensitive?: boolean;
    transient?: boolean;
    type: TBase<T>;
}
export type UCInputFieldValue<T extends DataType> = Value<T>;
export declare function ucifExamples<T extends DataType>(def: UCInputFieldDef<T>): T[] | undefined;
export declare function ucifHint<T extends DataType>(def: UCInputFieldDef<T>): string | undefined;
export declare function ucifId(key: UCFieldKey, prefix?: string, separator?: string): string;
export declare function ucifIsMandatory<T extends DataType>(def: UCInputFieldDef<T>): boolean;
export declare function ucifRepeatability<T extends DataType>(def: UCInputFieldDef<T>): [boolean, UIntQuantity];
export declare function ucifIsSensitive<T extends DataType>(def: UCInputFieldDef<T>): boolean;
export declare function ucifMustBeFilledManually<T extends DataType>(def: UCInputFieldDef<T>, opts?: {
    noContext: boolean;
}): boolean;
