import { IllegalArgumentError, } from '../../../error/index.js';
export function serverErrorJsonSchema(message) {
    return {
        additionalProperties: false,
        properties: {
            message: {
                examples: [message ?? new IllegalArgumentError().message],
                type: 'string',
            },
        },
        required: ['message'],
        type: 'object',
    };
}
