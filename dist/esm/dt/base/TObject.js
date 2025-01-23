import { TBase } from './TBase.js';
export var TObjectShapeValidationStrategy;
(function (TObjectShapeValidationStrategy) {
    TObjectShapeValidationStrategy["NONE"] = "NONE";
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
        if (this.raw === null || typeof this.raw !== 'object') {
            return super.fmt(ifNullOrUndefined);
        }
        return JSON.stringify(this.raw);
    }
    validate() {
        const validation = super.validate();
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
