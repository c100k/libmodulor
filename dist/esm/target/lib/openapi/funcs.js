import { ERROR_HTTP_STATUS_MAP } from '../../../error/index.js';
import { DEFAULT_UC_SEC_AT, DEFAULT_UC_SEC_PAKCT, } from '../../../uc/index.js';
import { isBlank } from '../../../utils/index.js';
import { serverErrorJsonSchema } from '../json-schema/error.js';
import { ucifJsonSchemaDef } from '../json-schema/input.js';
import { ucOutputJsonSchema } from '../json-schema/output.js';
import { AUTHORIZATION_HEADER_NAME, } from '../shared.js';
export function openAPIErrors() {
    return ERROR_HTTP_STATUS_MAP.entries().reduce((acc, cur) => {
        const [status, clazz] = cur;
        const message = new clazz().message;
        acc[status] = {
            content: {
                'application/json': {
                    schema: serverErrorJsonSchema(message),
                },
            },
            description: message,
        };
        return acc;
    }, {});
}
export function openAPIParameters(uc, envelope) {
    const res = [];
    switch (envelope) {
        case 'query-params':
            {
                for (const f of uc.inputFields) {
                    const { key } = f;
                    const { internal, spec } = ucifJsonSchemaDef(f);
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
export function openAPISuccess(uc, descriptions) {
    const schema = ucOutputJsonSchema(uc);
    if (!schema) {
        return {
            '204': {
                description: descriptions[204],
            },
        };
    }
    return {
        '200': {
            content: {
                'application/json': {
                    schema,
                },
            },
            description: descriptions[200],
        },
    };
}
