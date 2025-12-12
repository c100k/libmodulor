export const UCInputFieldFillingMode = {
    /**
     * Set programmatically on behalf of the user (e.g. a foreign key id for a given object)
     */
    AUTO_PRE: 'AUTO_PRE',
    /**
     * Set manually by the user (e.g. a form field, a cli flag, etc.)
     */
    MANUAL: 'MANUAL',
};
export function ucifExamples(def) {
    const { type } = def;
    const examples = type.getExamples();
    // Leaving the value `undefined` means you want the default value
    if (examples === undefined) {
        return [type.example()];
    }
    // Setting the examples to `[]` means you don't want them
    if (examples.length === 0) {
        return undefined;
    }
    return examples;
}
export function ucifHint(def) {
    if (ucifIsSensitive(def)) {
        return undefined;
    }
    const examples = ucifExamples(def);
    if (!examples || examples.length === 0 || typeof examples[0] === 'object') {
        return undefined;
    }
    if (examples.length === 1) {
        const [example] = examples;
        if (example !== undefined) {
            return example.toString();
        }
    }
    return examples.join(', ');
}
/**
 * The unique id associated to this field
 *
 * By default it would return `inputfield-myField`.
 * If you have the same field multiple times in one context (e.g. a web page), pass a unique element to the `prefix`.
 * For example `uc1-inputfield-myField` and `uc2-inputfield-myField`
 *
 * @param prefix
 * @param separator
 * @returns
 */
export function ucifId(key, prefix = 'inputfield', separator = '-') {
    return `${prefix}${separator}${key}`;
}
export function ucifIsMandatory(def) {
    const min = def.cardinality?.min;
    if (min === undefined) {
        return true;
    }
    return min > 0;
}
export function ucifRepeatability(def) {
    const max = def.cardinality?.max;
    if (max === undefined) {
        return [false, 0];
    }
    return [max > 1, max];
}
export function ucifIsSensitive(def) {
    const { sensitive, type } = def;
    return sensitive || type.isSensitive();
}
export function ucifMustBeFilledManually(def, opts) {
    const { fillingMode } = def;
    // If there is no mode, we consider it as UCInputFieldFillingMode.MANUAL
    if (!fillingMode) {
        return true;
    }
    const fillingModes = [
        UCInputFieldFillingMode.MANUAL,
    ];
    // If there is no context, it means that the field cannot be set via UCInputFieldFillingMode.AUTO_PRE (e.g. in CLI target)
    if (opts?.noContext) {
        fillingModes.push(UCInputFieldFillingMode.AUTO_PRE);
    }
    return fillingModes.includes(fillingMode);
}
