import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { fromJSONSchema } from 'zod';
import { openAPIInputSchema, openAPIOutputSchema } from '../openapi/funcs.js';
import { DEFAULT_VERSION } from '../shared.js';
import { ABORTED_RES } from './consts.js';
import { stdioToolInputSchema } from './stdio/input.js';
export function buildInputSchema(uc, lifecycle) {
    const jsonSchema = openAPIInputSchema(uc);
    switch (lifecycle) {
        case 'client':
            jsonSchema.properties = {
                ...jsonSchema.properties,
                ...stdioToolInputSchema(),
            };
            break;
        case 'server':
            // Nothing to do
            break;
        default:
            lifecycle;
    }
    // @ts-expect-error : Index signature for type 'string' is missing in type 'OpenAPISchema<UCInputUnwrapped<I>>'
    return fromJSONSchema(jsonSchema);
}
export function buildOutputSchema(uc) {
    const jsonSchema = openAPIOutputSchema(uc);
    if (!jsonSchema) {
        return;
    }
    // @ts-expect-error : Index signature for type 'string' is missing in type 'OpenAPISchema<UCInputUnwrapped<I>>'
    return fromJSONSchema(jsonSchema);
}
export function init(productManifest) {
    const { name, version } = productManifest;
    return new McpServer({
        name: name,
        version: version ?? DEFAULT_VERSION,
    });
}
export function resAborted() {
    return {
        content: [
            {
                text: ABORTED_RES,
                type: 'text',
            },
        ],
    };
}
export function resError(err) {
    return {
        content: [
            {
                text: err.message,
                type: 'text',
            },
        ],
        isError: true,
    };
}
export function resObj(obj) {
    return {
        content: [],
        structuredContent: obj,
    };
}
export function toolConfig(uc, lifecycle, wording) {
    const inputSchema = buildInputSchema(uc, lifecycle);
    const outputSchema = buildOutputSchema(uc);
    const { desc, label } = wording;
    const config = {
        annotations: {
            destructiveHint: uc.def.metadata.sensitive,
        },
        inputSchema,
        title: label,
    };
    if (outputSchema) {
        config.outputSchema = outputSchema;
    }
    if (desc) {
        config.description = desc;
    }
    return config;
}
