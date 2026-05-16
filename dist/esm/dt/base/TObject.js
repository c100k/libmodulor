import { TBase } from './TBase.js';
export const TObjectShapeValidationStrategy = {
    /**
     * No shape validation is performed
     *
     * To be used when the object can have multiple shapes or that its shape is not important.
     *
     * Otherwise, you can still override {@link validate} in the `T*` class and do your own validation.
     */
    NONE: 'NONE',
    /**
     * Validate against the {@link TObject.example()}
     *
     * It checks that the keys of the value, sorted alphabetically, are the same as the example's keys.
     */
    SAME_AS_EXAMPLE: 'SAME_AS_EXAMPLE',
};
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
    jsonSchemaType() {
        const example = this.example();
        const exampleKV = Object.entries(example);
        const properties = exampleKV.reduce((acc, [key, value]) => {
            const k = key;
            const typeofv = typeof value;
            // TODO : Make this work recursively
            switch (typeofv) {
                case 'boolean':
                    acc[k] = { type: 'boolean' };
                    break;
                case 'bigint':
                case 'number':
                    acc[k] = { type: 'number' };
                    break;
                case 'object':
                    acc[k] = {
                        additionalProperties: false,
                        properties: {},
                        type: 'object',
                    };
                    break;
                case 'function':
                case 'symbol':
                case 'undefined':
                    // Nothing to do
                    break;
                case 'string':
                    acc[k] = { type: 'string' };
                    break;
                default:
                    typeofv;
            }
            return acc;
        }, {});
        return { additionalProperties: false, properties, type: 'object' };
    }
    validate() {
        const validation = super.validate();
        if (!validation.isOK()) {
            return validation;
        }
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
                    strategy;
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
