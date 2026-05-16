export const RESERVED_KEY = '_reserved';
export const RESERVED_CONFIRMED_KEY = 'confirmed';
export function stdioToolInputSchema() {
    return {
        [RESERVED_KEY]: {
            additionalProperties: false,
            properties: {
                [RESERVED_CONFIRMED_KEY]: {
                    type: 'boolean',
                },
            },
            type: 'object',
        },
    };
}
