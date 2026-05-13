import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { fromJSONSchema } from 'zod';
import { openAPIInputSchema, openAPIOutputSchema, } from '../lib/openapi/funcs.js';
import { DEFAULT_VERSION } from '../lib/shared.js';
import { ABORTED_RES, ERR_LOGGER_LEVEL, RESERVED_CONFIRMED_KEY, RESERVED_KEY, } from './consts.js';
export function assertLoggerLevel(loggerLevel) {
    if (loggerLevel === 'error') {
        return;
    }
    // Depending on the `Logger` implementation, this.logger.error() might not write to stderr (e.g. can write to a file).
    // That's why we explicitly write to stdout by calling console.error().
    // biome-ignore lint/suspicious/noConsole: we want it
    console.error(new Error(ERR_LOGGER_LEVEL));
}
export function buildInputSchema(uc) {
    const jsonSchema = openAPIInputSchema(uc);
    // @ts-expect-error : Not part of the actual schema
    jsonSchema.properties[RESERVED_KEY] = {
        additionalProperties: false,
        properties: {
            [RESERVED_CONFIRMED_KEY]: {
                type: 'boolean',
            },
        },
        type: 'object',
    };
    // @ts-expect-error : Index signature for type 'string' is missing in type 'OpenAPISchema<UCInputUnwrapped<I>>'
    return fromJSONSchema(jsonSchema);
}
export function buildOutputSchema(uc) {
    const jsonSchema = openAPIOutputSchema(uc);
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
