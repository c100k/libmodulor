import { UCOPIBaseDefFields, UCOutputField, ucofExamples, ucofIsMandatory, ucofRepeatability, } from '../../../uc/index.js';
export function ucofJsonSchemaDef(field) {
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
    def.internal.required = ucofIsMandatory(fDef);
    def.spec = fType.jsonSchemaType();
    if (!def.internal.required && !Array.isArray(def.spec.type)) {
        def.spec.type = [def.spec.type, 'null'];
    }
    const examples = ucofExamples(fDef);
    if (examples) {
        def.spec.examples = examples;
    }
    const options = fType.getOptions();
    if (options) {
        def.spec.enum = options.map((o) => o.value);
        if (!def.internal.required) {
            def.spec.enum.push(null);
        }
    }
    const [isRepeatable] = ucofRepeatability(fDef);
    if (isRepeatable) {
        def.spec = {
            items: def.spec,
            type: def.internal.required ? 'array' : ['array', 'null'],
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
export function ucOPIJsonSchema(part) {
    const res = {
        additionalProperties: false,
        properties: {},
        type: 'object',
    };
    const allFields = { ...UCOPIBaseDefFields, ...part.fields };
    for (const entry of Object.entries(allFields)) {
        const key = entry[0];
        const fDef = entry[1];
        const f = new UCOutputField(key, fDef);
        const { internal, spec } = ucofJsonSchemaDef(f);
        if (!spec) {
            continue;
        }
        const k = key;
        res.properties[k] = spec;
        if (!internal?.required) {
            continue;
        }
        if (!res.required) {
            res.required = [];
        }
        res.required.push(k);
    }
    return res;
}
export function ucOutputPartJsonSchema(part) {
    return {
        additionalProperties: false,
        properties: {
            items: {
                items: ucOPIJsonSchema(part),
                type: 'array',
            },
            pagination: ucOutputPartPaginationJsonSchema(),
            total: { examples: [1], type: 'integer' },
        },
        required: ['items', 'total'],
        type: 'object',
    };
}
export function ucOutputPartPaginationJsonSchema() {
    return {
        additionalProperties: false,
        properties: {
            id: { format: 'uuid', type: 'string' },
            limit: { type: 'integer' },
            offset: { type: 'integer' },
            q: { type: 'string' },
        },
        type: 'object',
    };
}
export function ucOutputJsonSchema(uc) {
    if (!uc.hasOutputParts()) {
        return null;
    }
    const res = {
        additionalProperties: false,
        properties: {},
        type: 'object',
    };
    const part0 = uc.def.io.o?.parts?._0;
    if (!part0) {
        return null;
    }
    res.properties.parts = {
        additionalProperties: false,
        properties: {
            _0: ucOutputPartJsonSchema(part0),
        },
        required: ['_0'],
        type: 'object',
    };
    const part1 = uc.def.io.o?.parts?._1;
    if (!part1) {
        return res;
    }
    res.properties.parts.properties = {
        _1: ucOutputPartJsonSchema(part1),
    };
    res.properties.parts.required?.push('_1');
    return res;
}
