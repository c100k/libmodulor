import { TBase } from './TBase.js';
export var TObjectShapeValidationStrategy;
(function (TObjectShapeValidationStrategy) {
    /**
     * No shape validation is performed
     *
     * To be used when the object can have multiple shapes or that its shape is not important.
     *
     * Otherwise, you can still override {@link validate} in the `T*` class and do your own validation.
     */
    TObjectShapeValidationStrategy["NONE"] = "NONE";
    /**
     * Validate against the {@link TObject.example()}
     *
     * It checks that the keys of the value, sorted alphabetically, are the same as the example's keys.
     */
    TObjectShapeValidationStrategy["SAME_AS_EXAMPLE"] = "SAME_AS_EXAMPLE";
})(TObjectShapeValidationStrategy || (TObjectShapeValidationStrategy = {}));
export class TObject extends TBase {
    constraints;
    constructor(constraints = {
        shapeValidationStrategy: TObjectShapeValidationStrategy.SAME_AS_EXAMPLE,
    }) {
        super();
        this.constraints = constraints;
    }
    tName() {
        return 'Object';
    }
    example() {
        return {};
    }
    fmt(ifNullOrUndefined) {
        // typeof this.raw is 'object', hence the check for nullity
        if (this.raw === null || typeof this.raw !== 'object') {
            return super.fmt(ifNullOrUndefined);
        }
        return JSON.stringify(this.raw);
    }
    validate() {
        const validation = super.validate();
        // typeof this.raw is 'object', hence the check for nullity
        if (this.raw === null || typeof this.raw !== 'object') {
            validation.add({
                constraint: 'type',
                expected: 'object',
            });
        }
        else {
            const strategy = this.constraints?.shapeValidationStrategy;
            switch (strategy) {
                case TObjectShapeValidationStrategy.NONE:
                    break;
                case TObjectShapeValidationStrategy.SAME_AS_EXAMPLE: {
                    const [isValid, expectedKeys] = this.valueAndExampleHaveSameKeys();
                    if (!isValid) {
                        validation.add({
                            constraint: 'shape',
                            expected: ['=~', expectedKeys],
                        });
                    }
                    break;
                }
                default:
                    ((_) => { })(strategy);
            }
        }
        return validation;
    }
    valueAndExampleHaveSameKeys() {
        const valueKeys = Object.keys(this.raw ?? {}).sort((a, b) => a.localeCompare(b));
        const example = this.example();
        const exampleKeys = Object.keys(example).sort((a, b) => a.localeCompare(b));
        return [
            valueKeys.length === exampleKeys.length &&
                valueKeys.join('') === exampleKeys.join(''),
            exampleKeys,
        ];
    }
}
