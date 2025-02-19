import { Validation } from '../dt/index.js';
import { isBlank } from '../utils/index.js';
import { UCInputFieldChangeOperator, ucifIsMandatory, ucifMustBeFilledManually, ucifRepeatability, } from './input-field.js';
import { rVal0, rValArr } from './utils/rVal.js';
import { ucifcoIsForArray } from './utils/ucifcoIsForArray.js';
export class UCInputField {
    key;
    def;
    /**
     * In some cases, the wording needs to be adapted in function of the context and not be statically fetched from {@link I18nManager}.
     *
     * For instance, when the user does X, then the description becomes Y.
     */
    dynamicWording;
    value;
    constructor(key, def) {
        this.key = key;
        this.def = def;
        const initialValue = def.type.getInitialValue();
        if (initialValue !== undefined) {
            this.value = initialValue;
        }
    }
    clear() {
        this.value = undefined;
        const initialValue = this.def.type.getInitialValue();
        if (initialValue !== undefined) {
            this.value = initialValue;
        }
    }
    getDynamicWording() {
        return this.dynamicWording;
    }
    getValue() {
        return this.value;
    }
    /**
     * Read the value as a primitive
     *
     * Unlike the standalone {@link rVal0}, it returns the default value if present.
     *
     * @returns
     */
    rVal0() {
        const val = rVal0(this.value);
        if (!isBlank(val)) {
            return val;
        }
        const defaultValue = this.def.type.getDefaultValue();
        if (defaultValue !== undefined) {
            return defaultValue;
        }
        return null;
    }
    /**
     * Require the value as a primitive
     *
     * Unlink the standalone {@link reqVal0}, it returns the default value if present.
     *
     * Otherwise, it throws an error.
     *
     * @returns
     */
    reqVal0() {
        if (!isBlank(this.value)) {
            if (Array.isArray(this.value)) {
                // Throwing an Error and not a IllegalArgumentError because this is usually the developer's fault.
                throw new Error('The value is an array. Use rValArr instead.');
            }
            return this.value;
        }
        const defaultValue = this.def.type.getDefaultValue();
        if (defaultValue !== undefined) {
            return defaultValue;
        }
        // Throwing an Error and not an IllegalArgumentError because this is usually the developer's fault.
        throw new Error(`${this.key.toString()} is not set and has no default value. Do not require it.`);
    }
    /**
     * Require the value as an array
     *
     * Unlink the standalone {@link rValArr}, it returns the default value in an array if present.
     *
     * @returns
     */
    rValArr() {
        if (!isBlank(this.value)) {
            if (!Array.isArray(this.value)) {
                // Throwing an Error and not a IllegalArgumentError because this is usually the developer's fault.
                throw new Error('The value is a primitive. Use reqVal0 instead.');
            }
            return this.value;
        }
        const defaultValue = this.def.type.getDefaultValue();
        if (defaultValue !== undefined) {
            // We might need to allow multiple default values to handle all the cases.
            return [defaultValue];
        }
        // Unlike in reqVal0, we return a default empty array anyways to make it usable.
        // Otherwise, we could not get the value of an optional repeatable field (see remark above on the defaultValue).
        return [];
    }
    setValue(op, value) {
        if (op === UCInputFieldChangeOperator.RESET) {
            this.clear();
            return;
        }
        const { type } = this.def;
        type.assign(value);
        const val = type.val();
        if (val === undefined) {
            return;
        }
        if (!ucifcoIsForArray(op)) {
            // Using a switch, even for just one case, to have it trigger an error if we miss to handle an enum value
            switch (op) {
                case UCInputFieldChangeOperator.SET:
                    this.value = val;
                    break;
                default:
                    ((_) => { })(op);
            }
            return;
        }
        const current = Array.isArray(this.value) ? this.value : [];
        switch (op) {
            // We are not really forced to use immutability here, but it's better for consistency
            case UCInputFieldChangeOperator.ADD:
                this.value = current.concat([val]);
                break;
            case UCInputFieldChangeOperator.REMOVE:
                this.value = current.filter((v) => v !== val);
                break;
            default:
                ((_) => { })(op);
        }
    }
    updateDef(def) {
        this.def = def;
    }
    updateDynamicWording(dynamicWording) {
        this.dynamicWording = dynamicWording;
    }
    updateType(type) {
        this.def.type = type;
    }
    validateMandatoriness() {
        const validation = new Validation();
        // We use `noContext: true` here to validate even the fields that should be set AUTO_PRE
        // Even though it's an indicator that the developer made a mistake,
        // we shouldn't send the error "X is not set and has no default value. Do not require it."
        // to the user
        const needsValidation = ucifMustBeFilledManually(this.def, { noContext: true }) &&
            ucifIsMandatory(this.def) &&
            isBlank(this.value);
        if (!needsValidation) {
            return validation;
        }
        validation.add({
            constraint: 'mandatory',
            expected: undefined,
        });
        return validation;
    }
    validate() {
        // Unlike UC.validate, this method returns all the errors at once.
        // This can be discussed later to see if we want to harmonize.
        const validation = this.validateMandatoriness();
        if (this.value !== undefined && this.value !== null) {
            const [isRepeatable] = ucifRepeatability(this.def);
            if (!isRepeatable && Array.isArray(this.value)) {
                validation.add({ constraint: 'type', expected: 'scalar' });
            }
            if (isRepeatable && !Array.isArray(this.value)) {
                validation.add({ constraint: 'type', expected: 'array' });
            }
        }
        const valueAsArr = rValArr(this.value);
        for (const val of valueAsArr) {
            const typeValidation = this.def.type.assign(val).validate();
            if (!typeValidation.isOK()) {
                validation.concat(typeValidation);
            }
        }
        const { cardinality } = this.def;
        if (cardinality) {
            const { max, min } = cardinality;
            const { length } = valueAsArr;
            if (max !== undefined && length > max) {
                validation.add({
                    constraint: 'maxCount',
                    expected: max,
                });
            }
            if (min !== undefined && length < min) {
                validation.add({
                    constraint: 'minCount',
                    expected: min,
                });
            }
        }
        return validation;
    }
}
