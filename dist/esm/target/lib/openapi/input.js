import { ucifExamples, ucifIsMandatory, ucifRepeatability, } from '../../../uc/index.js';
export function openAPIInputDef(field) {
    const def = {
        internal: {},
        spec: { type: 'string' },
    };
    if (!def.internal || !def.spec) {
        // Just a guard to safely type the rest of the function without using !
        return def;
    }
    const { def: fDef } = field;
    const { type: fType } = fDef;
    def.internal.required = ucifIsMandatory(fDef);
    def.spec = fType.jsonSchemaType();
    if (!def.internal.required && !Array.isArray(def.spec.type)) {
        def.spec.type = [def.spec.type, 'null'];
    }
    const examples = ucifExamples(fDef);
    if (examples) {
        def.spec.examples = examples;
    }
    const options = fType.getOptions();
    if (options) {
        def.spec.enum = options.map((o) => o.value);
    }
    const [isRepeatable] = ucifRepeatability(fDef);
    if (isRepeatable) {
        def.spec = {
            items: def.spec,
            type: 'array',
        };
        if (fDef.cardinality?.max !== undefined) {
            def.spec.maxItems = fDef.cardinality?.max;
        }
        if (fDef.cardinality?.min !== undefined) {
            def.spec.minItems = fDef.cardinality?.min;
        }
    }
    return def;
}
