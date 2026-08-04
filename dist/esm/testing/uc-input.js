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
export function inputFillersForUC(ucd, fillers) {
    return [ucd.metadata.name, fillers];
}
export function allWithExamples(uc) {
    for (const f of uc.inputFieldsOrdered()) {
        fillWithExample(f);
    }
}
export function allWithExamplesAnd(i) {
    return (uc) => {
        allWithExamples(uc);
        for (const [k, v] of Object.entries(i)) {
            uc.inputField(k).setVal(v);
        }
    };
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
        let b64;
        if (example.type === 'image/png') {
            b64 =
                'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGNgAAEAAAUAAQ0KLbQAAAAASUVORK5CYII=';
        }
        else if (example.type === 'image/jpg') {
            b64 =
                '/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAALCAABAAEBAREA/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/aAAwDAQACEAMQAAAB6AAAAP/EABQQAQAAAAAAAAAAAAAAAAAAACD/2gAIAQEAAQUCn//EABQRAQAAAAAAAAAAAAAAAAAAACD/2gAIAQMBAT8Bp//EABQRAQAAAAAAAAAAAAAAAAAAACD/2gAIAQIBAT8Bp//Z';
        }
        else if (example.type === 'application/pdf') {
            b64 =
                'JVBERi0xLjEKMSAwIG9iago8PCAvVHlwZSAvQ2F0YWxvZyAvUGFnZXMgMiAwIFIgPj4KZW5kb2JqCjIgMCBvYmoKPDwgL1R5cGUgL1BhZ2VzIC9LaWRzIFszIDAgUl0gL0NvdW50IDEgPj4KZW5kb2JqCjMgMCBvYmoKPDwgL1R5cGUgL1BhZ2UgL1BhcmVudCAyIDAgUiAvTWVkaWFCb3ggWzAgMCAxIDEgXSA+PgplbmRvYmoKeHJlZgowIDQKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDEwIDAwMDAwIG4gCjAwMDAwMDAwNjMgMDAwMDAgbiAKMDAwMDAwMDExNCAwMDAwMCBuIAp0cmFpbGVyCjw8IC9Sb290IDEgMCBSIC9TaXplIDQgPj4Kc3RhcnR4cmVmCjE2NQolJUVPRg==';
        }
        else {
            b64 = 'WsMR7wiUcr1PANFsqDn+IXuVROATym+NslcZ9APeiGE='; // Just random bytes
        }
        const bytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
        const val = new File([bytes], example.name, {
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
