import { TBoolean } from '../../dt/index.js';
import { ucifIsMandatory, ucifRepeatability } from '../input-field.js';
const DEFAULT_OPTS = {
    forceArrayAsEmpty: false,
    forceBooleanAsFalse: true,
    ignoreTransient: false,
    ignoreUndefined: false,
};
export function rInput(uc, opts) {
    const forceArrayAsEmpty = opts?.forceArrayAsEmpty ?? DEFAULT_OPTS.forceArrayAsEmpty;
    const forceBooleanAsFalse = opts?.forceBooleanAsFalse ?? DEFAULT_OPTS.forceBooleanAsFalse;
    const ignoreTransient = opts?.ignoreTransient ?? DEFAULT_OPTS.ignoreTransient;
    const ignoreUndefined = opts?.ignoreUndefined ?? DEFAULT_OPTS.ignoreUndefined;
    const input = {};
    let fields = uc.inputFields;
    if (ignoreTransient) {
        fields = fields.filter((f) => f.def.transient !== true);
    }
    for (const f of fields) {
        const { type } = f.def;
        let value = f.getValue();
        if (forceBooleanAsFalse &&
            type instanceof TBoolean &&
            ucifIsMandatory(f.def) &&
            (value === null || value === undefined)) {
            value = false;
        }
        const [isRepeatable] = ucifRepeatability(f.def);
        if (forceArrayAsEmpty &&
            isRepeatable &&
            (value === null || value === undefined)) {
            value = [];
        }
        if (!ignoreUndefined || (ignoreUndefined && value !== undefined)) {
            // Useful when we get the input before persisting for example.
            // Otherwise it will persist `undefined` as a string in the database, for nothing.
            input[f.key] = value;
        }
    }
    return input;
}
