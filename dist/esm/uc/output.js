export const UC_OUTPUT_PARTS_FIELD = 'parts';
export const UC_OUTPUT_PARTS_FIELD_0 = '_0';
export const UC_OUTPUT_PARTS_FIELD_1 = '_1';
export function buildSingleItemOutput(item) {
    return {
        parts: {
            _0: {
                items: [item],
                total: 1,
            },
        },
    };
}
