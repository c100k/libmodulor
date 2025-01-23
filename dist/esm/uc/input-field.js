export var UCInputFieldChangeOperator;
(function (UCInputFieldChangeOperator) {
    UCInputFieldChangeOperator["ADD"] = "ADD";
    UCInputFieldChangeOperator["REMOVE"] = "REMOVE";
    UCInputFieldChangeOperator["RESET"] = "RESET";
    UCInputFieldChangeOperator["SET"] = "SET";
})(UCInputFieldChangeOperator || (UCInputFieldChangeOperator = {}));
export var UCInputFieldFillingMode;
(function (UCInputFieldFillingMode) {
    UCInputFieldFillingMode["AUTO_PRE"] = "AUTO_PRE";
    UCInputFieldFillingMode["MANUAL"] = "MANUAL";
})(UCInputFieldFillingMode || (UCInputFieldFillingMode = {}));
export function ucifExamples(def) {
    const { type } = def;
    const examples = type.getExamples();
    if (examples === undefined) {
        return [type.example()];
    }
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
    if (!fillingMode) {
        return true;
    }
    const fillingModes = [
        UCInputFieldFillingMode.MANUAL,
    ];
    if (opts?.noContext) {
        fillingModes.push(UCInputFieldFillingMode.AUTO_PRE);
    }
    return fillingModes.includes(fillingMode);
}
