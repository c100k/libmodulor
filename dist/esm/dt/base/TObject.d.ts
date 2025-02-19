import type { Validation } from '../Validation.js';
import { TBase, type TName } from './TBase.js';
export declare enum TObjectShapeValidationStrategy {
    /**
     * No shape validation is performed
     *
     * To be used when the object can have multiple shapes or that its shape is not important.
     *
     * Otherwise, you can still override {@link validate} in the `T*` class and do your own validation.
     */
    NONE = "NONE",
    /**
     * Validate against the {@link TObject.example()}
     *
     * It checks that the keys of the value, sorted alphabetically, are the same as the example's keys.
     */
    SAME_AS_EXAMPLE = "SAME_AS_EXAMPLE"
}
export interface TObjectConstraints {
    /**
     * @defaultValue {@link TObjectShapeValidationStrategy.SAME_AS_EXAMPLE}
     */
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
