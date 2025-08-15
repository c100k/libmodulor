import { TFile } from '../dt/index.js';
import { ucifIsMandatory, ucifMustBeFilledManually, ucifRepeatability, } from '../uc/index.js';
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
// biome-ignore lint/suspicious/noExplicitAny: can be anything
function fillWithExample(f) {
    const { type } = f.def;
    if (type instanceof TFile) {
        const example = type.getExamples()?.[0] ?? type.example();
        // TODO : Consider building a real file with real data (e.g. image, pdf, txt, etc.)
        const val = new File(['01010101010101010101010101010101'], example.path, {
            type: example.type,
        });
        const [isRepeatable] = ucifRepeatability(f.def);
        if (isRepeatable) {
            f.addVal(val);
        }
        else {
            f.setVal(val);
        }
        return;
    }
    f.fillWithExample();
}
