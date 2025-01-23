import type { Validation } from '../Validation.js';
import { TBase, type TName } from './TBase.js';
export declare enum TObjectShapeValidationStrategy {
    NONE = "NONE",
    SAME_AS_EXAMPLE = "SAME_AS_EXAMPLE"
}
export interface TObjectConstraints {
    shapeValidationStrategy: TObjectShapeValidationStrategy;
}
export declare class TObject<T extends object> extends TBase<T> {
    protected constraints: TObjectConstraints;
    constructor(constraints?: TObjectConstraints);
    tName(): TName;
    example(): T;
    fmt(ifNullOrUndefined?: string | undefined): string;
    validate(): Validation;
    private valueAndExampleHaveSameKeys;
}
