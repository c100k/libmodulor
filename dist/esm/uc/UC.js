import { TFile, Validation } from '../dt/index.js';
import { isBlank } from '../utils/index.js';
import { UCInputField } from './UCInputField.js';
import { UCInputFieldChangeOperator, ucifIsMandatory, ucifIsSensitive, ucifMustBeFilledManually, } from './input-field.js';
import { AggregateInputDef } from './io/input/AggregateInput.js';
import { ListInputDef } from './io/input/ListInput.js';
export class UC {
    appManifest;
    def;
    auth;
    inputFields;
    constructor(appManifest, def, auth) {
        this.appManifest = appManifest;
        this.def = def;
        this.auth = auth;
        const iFields = def.io.i?.fields;
        this.inputFields = iFields
            ? Object.entries(iFields).map(([key, def]) => new UCInputField(key, def))
            : [];
    }
    clear() {
        for (const f of this.inputFields) {
            if (!ucifMustBeFilledManually(f.def)) {
                continue;
            }
            f.clear();
        }
    }
    clearSensitiveInputFields() {
        for (const f of this.inputFieldsSensitive()) {
            f.clear();
        }
    }
    fill(input) {
        for (const f of this.inputFields) {
            f.setValue(UCInputFieldChangeOperator.SET, input[f.key]);
        }
        return this;
    }
    hasInputField(key) {
        return this.inputFields.find((f) => f.key === key) !== undefined;
    }
    hasMediaInInput() {
        return !!this.inputFields.find((f) => f.def.type instanceof TFile);
    }
    hasOutputParts() {
        return !!this.def.io.o?.parts;
    }
    inputField(key) {
        const field = this.inputFields.find((f) => f.key === key);
        if (!field) {
            throw new Error(`Input field ${key.toString()} does not exist`);
        }
        return field;
    }
    inputFieldsForForm() {
        const ordered = this.inputFieldsOrdered().filter((f) => ucifMustBeFilledManually(f.def));
        const dependencies = this.def.io.i?.dependencies;
        if (!dependencies) {
            return ordered;
        }
        return ordered.filter((f) => {
            const deps = dependencies[f.key];
            if (!deps) {
                return true;
            }
            const depsValues = deps.map((fKey) => this.inputField(fKey).getValue());
            const blankDepsValues = depsValues.filter((v) => isBlank(v));
            return blankDepsValues.length === 0;
        });
    }
    inputFieldsOrdered() {
        const order = this.def.io.i?.order;
        if (!order) {
            return this.inputFields;
        }
        return this.inputFields.sort((a, b) => {
            const idxA = order.indexOf(a.key);
            const idxB = order.indexOf(b.key);
            if (idxA < idxB) {
                return -1;
            }
            if (idxA > idxB) {
                return 1;
            }
            return 0;
        });
    }
    inputFieldsInsensitive() {
        return this.inputFields.filter((f) => !ucifIsSensitive(f.def));
    }
    inputFieldsSensitive() {
        return this.inputFields.filter((f) => ucifIsSensitive(f.def));
    }
    needsInputFilling() {
        const fields = this.inputFields;
        if (fields.length === 0) {
            return false;
        }
        const isListInput = Object.keys(ListInputDef.fields)
            .sort((a, b) => a.localeCompare(b))
            .join('') ===
            fields
                .map((f) => f.key)
                .sort((a, b) => a.localeCompare(b))
                .join('');
        if (isListInput) {
            return false;
        }
        return fields.filter((f) => ucifMustBeFilledManually(f.def)).length > 0;
    }
    needsOutputDisplay() {
        return this.hasOutputParts();
    }
    operatesOnAggregate() {
        const fields = this.inputFields;
        const aggregateIdField = fields.find((f) => f.key === Object.keys(AggregateInputDef['fields'])[0]);
        return !!aggregateIdField && ucifIsMandatory(aggregateIdField.def);
    }
    rVal0(key) {
        return this.inputField(key).rVal0();
    }
    reqVal0(key) {
        return this.inputField(key).reqVal0();
    }
    rValArr(key) {
        return this.inputField(key).rValArr();
    }
    validate() {
        for (const f of this.inputFields) {
            const validation = f.validate();
            if (!validation.isOK()) {
                return [f, validation];
            }
        }
        const combinedValidation = this.def.io.i?.validation;
        if (!combinedValidation) {
            return null;
        }
        const { or } = combinedValidation;
        if (!or) {
            return null;
        }
        const definedValues = or
            .map((key) => !isBlank(this.inputField(key).getValue()))
            .filter((v) => !!v);
        if (definedValues.length === 0) {
            const validation = new Validation();
            validation.add({
                constraint: 'fieldsOr',
                expected: or.join(', '),
            });
            return [null, validation];
        }
        return null;
    }
}
