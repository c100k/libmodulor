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
    // biome-ignore lint/suspicious/noExplicitAny: can be anything
    inputFields;
    constructor(appManifest, def, auth) {
        this.appManifest = appManifest;
        this.def = def;
        this.auth = auth;
        const iFields = def.io.i?.fields;
        this.inputFields = iFields
            ? Object.entries(iFields).map(([key, def]) => new UCInputField(key, 
            // biome-ignore lint/suspicious/noExplicitAny: can be anything
            def))
            : [];
    }
    clear() {
        for (const f of this.inputFields) {
            // We clear only the fields that have been filled manually
            // For example, fields marked as `UCInputFieldFillingMode.AUTO_PRE` are not cleared so they can be reused in the use case
            if (!ucifMustBeFilledManually(f.def)) {
                continue;
            }
            f.clear();
        }
    }
    clearSensitiveInputFields() {
        // TODO : Check how we can automate this before and .persist operation
        // Be careful with the fields that are saved but hashed before (e.g. password).
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
    // biome-ignore lint/suspicious/noExplicitAny: can be anything
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
    // biome-ignore lint/suspicious/noExplicitAny: can be anything
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
    // biome-ignore lint/suspicious/noExplicitAny: can be anything
    inputFieldsInsensitive() {
        return this.inputFields.filter((f) => !ucifIsSensitive(f.def));
    }
    // biome-ignore lint/suspicious/noExplicitAny: can be anything
    inputFieldsSensitive() {
        return this.inputFields.filter((f) => ucifIsSensitive(f.def));
    }
    needsInputFilling() {
        const fields = this.inputFields;
        if (fields.length === 0) {
            return false;
        }
        // TODO : Avoid this workaround when we figure out how to let the user change these values in terms of UI
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
    // biome-ignore lint/suspicious/noExplicitAny: can be anything
    validate() {
        // This implementation returns an error as soon as one is met.
        // This can be discussed later as we can also return an array of errors all at once.
        // Unary fields
        for (const f of this.inputFields) {
            const validation = f.validate();
            if (!validation.isOK()) {
                return [f, validation];
            }
        }
        // Fields combinations
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
                // TODO : Display the translated labels and not the keys
                expected: or.join(', '),
            });
            return [null, validation];
        }
        return null;
    }
}
