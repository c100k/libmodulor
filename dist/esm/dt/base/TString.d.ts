import type { Validation, ViolationFormat } from '../Validation.js';
import { type ConstraintsForHuman, TBase, type TName } from './TBase.js';
export interface TStringConstraints<VF extends ViolationFormat | (string & {}) = ViolationFormat> {
    format?: {
        f: VF;
        regexp: RegExp;
    } | undefined;
    maxLength?: number;
    minLength?: number;
}
export declare class TString<T extends string = string, VF extends ViolationFormat | (string & {}) = ViolationFormat> extends TBase<T> {
    private constraints?;
    static readonly DEFAULT_MAX_LENGTH = 999999;
    static readonly DEFAULT_MIN_LENGTH = 0;
    constructor(constraints?: TStringConstraints<VF> | undefined);
    tName(): TName;
    example(): T;
    getConstraintsForHuman(): ConstraintsForHuman | null;
    getConstraints(): TStringConstraints<VF> | undefined;
    isPotentiallyLong(): boolean;
    protected removeFormatConstraint(): void;
    validate(): Validation;
}
