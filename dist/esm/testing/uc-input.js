import { TFile } from '../dt/index.js';
import { UCInputFieldChangeOperator, ucifIsMandatory, ucifMustBeFilledManually, ucifRepeatability, } from '../uc/index.js';
export const DEFAULT_UC_INPUT_FILLERS = [
    'ALL_WITH_EXAMPLES',
    'ONLY_MANDATORY_WITH_EXAMPLES',
    'ONLY_SET_PROGRAMMATICALLY_WITH_EXAMPLES',
];
export function defaultUCInputFillers() {
    return {
        ALL_WITH_EXAMPLES: allWithExamples,
        ONLY_MANDATORY_WITH_EXAMPLES: onlyMandatoryWithExamples,
        ONLY_SET_PROGRAMMATICALLY_WITH_EXAMPLES: onlySetProgrammaticallyWithExamples,
    };
}
export function allWithExamples(uc) {
    for (const f of uc.inputFieldsOrdered()) {
        fillWithExample(f);
    }
}
export function onlyMandatoryWithExamples(uc) {
    for (const f of uc.inputFieldsOrdered()) {
        if (!ucifIsMandatory(f.def)) {
            continue;
        }
        fillWithExample(f);
    }
}
export function onlySetProgrammaticallyWithExamples(uc) {
    for (const f of uc.inputFieldsOrdered()) {
        if (ucifMustBeFilledManually(f.def)) {
            continue;
        }
        fillWithExample(f);
    }
}
function fillWithExample(f) {
    const { type } = f.def;
    let val = type.getExamples()?.[0] ?? type.example();
    if (type instanceof TFile) {
        const file = val;
        val = new File(['01010101010101010101010101010101'], file.path, {
            type: file.type,
        });
    }
    const [isRepeatable] = ucifRepeatability(f.def);
    if (isRepeatable) {
        f.setValue(UCInputFieldChangeOperator.ADD, val);
    }
    else {
        f.setValue(UCInputFieldChangeOperator.SET, val);
    }
}
