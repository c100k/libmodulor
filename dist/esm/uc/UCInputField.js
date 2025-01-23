import { Validation } from '../dt/index.js';
import { isBlank } from '../utils/index.js';
import { UCInputFieldChangeOperator, ucifIsMandatory, ucifMustBeFilledManually, ucifRepeatability, } from './input-field.js';
import { rVal0, rValArr } from './utils/rVal.js';
import { ucifcoIsForArray } from './utils/ucifcoIsForArray.js';
export class UCInputField {
    key;
    def;
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
    reqVal0() {
        if (!isBlank(this.value)) {
            if (Array.isArray(this.value)) {
                throw new Error('The value is an array. Use rValArr instead.');
            }
            return this.value;
        }
        const defaultValue = this.def.type.getDefaultValue();
        if (defaultValue !== undefined) {
            return defaultValue;
        }
        throw new Error(`${this.key.toString()} is not set and has no default value. Do not require it.`);
    }
    rValArr() {
        if (!isBlank(this.value)) {
            if (!Array.isArray(this.value)) {
                throw new Error('The value is a primitive. Use reqVal0 instead.');
            }
            return this.value;
        }
        const defaultValue = this.def.type.getDefaultValue();
        if (defaultValue !== undefined) {
            return [defaultValue];
        }
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
