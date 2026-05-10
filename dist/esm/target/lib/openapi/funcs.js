import { ERROR_HTTP_STATUS_MAP, IllegalArgumentError, } from '../../../error/index.js';
import { DEFAULT_UC_SEC_AT, DEFAULT_UC_SEC_PAKCT, UCOutputReader, ucofExamples, } from '../../../uc/index.js';
import { isBlank } from '../../../utils/index.js';
import { AUTHORIZATION_HEADER_NAME, } from '../shared.js';
import { SUCCESS_DESCRIPTION } from './consts.js';
import { openAPIInputDef } from './input.js';
export function openAPIErrorSchema() {
    return {
        additionalProperties: false,
        properties: {
            message: {
                examples: [new IllegalArgumentError().message],
                type: 'string',
            },
        },
        type: 'object',
    };
}
export function openAPIErrors() {
    return ERROR_HTTP_STATUS_MAP.entries().reduce((acc, cur) => {
        const [status, clazz] = cur;
        const message = new clazz().message;
        acc[status] = {
            content: {
                'application/json': {
                    schema: {
                        additionalProperties: false,
                        properties: {
                            message: {
                                examples: [message],
                                type: 'string',
                            },
                        },
                        type: 'object',
                    },
                },
            },
            description: message,
        };
        return acc;
    }, {});
}
export function openAPIInputSchema(uc) {
    const res = {
        additionalProperties: false,
        properties: {},
        type: 'object',
    };
    for (const f of uc.inputFields) {
        const { key } = f;
        const { internal, spec } = openAPIInputDef(f);
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
export function openAPIOPISchema(part) {
    const res = {
        additionalProperties: false,
        properties: {},
        type: 'object',
    };
    for (const f of part.fields) {
        const { def, key } = f;
        const { type } = def;
        const k = key;
        res.properties[k] = type.jsonSchemaType();
        const examples = ucofExamples(def);
        if (examples) {
            res.properties[k].examples = examples;
        }
    }
    return res;
}
export function openAPIOutputPartSchema(part) {
    return {
        additionalProperties: false,
        properties: {
            items: {
                items: openAPIOPISchema(part),
                type: 'array',
            },
            pagination: {
                properties: {
                    id: { format: 'uuid', type: 'string' },
                    limit: { type: 'integer' },
                    offset: { type: 'integer' },
                    q: { type: 'string' },
                },
                type: 'object',
            },
            total: { examples: [1], type: 'integer' },
        },
        required: ['items', 'total'],
        type: 'object',
    };
}
export function openAPIOutputSchema(uc) {
    const res = {
        additionalProperties: false,
        properties: {},
        type: 'object',
    };
    if (!uc.hasOutputParts()) {
        return res;
    }
    const ucor = new UCOutputReader(uc.def, undefined);
    const [part0, part1] = ucor.parts();
    res.properties.parts = {
        properties: {
            _0: openAPIOutputPartSchema(part0),
        },
        type: 'object',
    };
    if (part1) {
        res.properties.parts.properties = {
            _1: openAPIOutputPartSchema(part1),
        };
    }
    return res;
}
export function openAPIParameters(uc, envelope) {
    const res = [];
    switch (envelope) {
        case 'query-params':
            {
                for (const f of uc.inputFields) {
                    const { key } = f;
                    const { internal, spec } = openAPIInputDef(f);
                    if (!spec) {
                        continue;
                    }
                    res.push({
                        in: 'query',
                        name: key,
                        required: internal?.required ?? false,
                        schema: spec,
                    });
                }
            }
            break;
        default:
            envelope;
    }
    return res;
}
export function openAPIRequestBody(uc, envelope, fqUCInputName) {
    const innerContent = {
        schema: {
            $ref: `#/components/schemas/${fqUCInputName}`,
        },
    };
    switch (envelope) {
        case 'form-data': {
            const repeatableFields = uc.inputFieldsRepeatable();
            const content = {
                'multipart/form-data': innerContent,
            };
            if (!isBlank(repeatableFields)) {
                content['multipart/form-data'].encoding = {};
            }
            for (const f of repeatableFields) {
                // This is to prevent SwaggerUI from sending the values comma separated
                // biome-ignore lint/style/noNonNullAssertion: we want it
                content['multipart/form-data'].encoding[f.key] = {
                    explode: true,
                    style: 'form',
                };
            }
            return {
                content,
                required: true,
            };
        }
        case 'json':
            return {
                content: {
                    'application/json': innerContent,
                },
                required: true,
            };
        default:
            envelope;
            throw new Error();
    }
}
export function openAPISecuritySchemes(authCookieName, publicApiKeyHeaderName) {
    return {
        apiKey: {
            bearerFormat: 'Bearer',
            in: 'header',
            name: AUTHORIZATION_HEADER_NAME,
            type: 'apiKey',
        },
        basic: {
            scheme: 'basic',
            type: 'http',
        },
        jwt: {
            in: 'cookie',
            name: authCookieName,
            type: 'apiKey',
        },
        publicApiKey: {
            in: 'header',
            name: publicApiKeyHeaderName,
            type: 'apiKey',
        },
    };
}
export function openAPISecurity(sec) {
    const item = {};
    const res = [item];
    const publicApiCheckType = sec?.publicApiKeyCheckType ?? DEFAULT_UC_SEC_PAKCT;
    switch (publicApiCheckType) {
        case 'off':
            break;
        case 'on':
            item.publicApiKey = [];
            break;
        default:
            publicApiCheckType;
    }
    const authType = sec?.authType ?? DEFAULT_UC_SEC_AT;
    item[authType] = [];
    return res;
}
export function openAPISuccess(uc) {
    return {
        '200': {
            content: {
                'application/json': {
                    schema: openAPIOutputSchema(uc),
                },
            },
            description: SUCCESS_DESCRIPTION,
        },
    };
}
