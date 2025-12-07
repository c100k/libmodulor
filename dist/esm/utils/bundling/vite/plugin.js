import { assertTransformedCorrectly, isFileEligible } from '../funcs.js';
import { transform } from '../typescript.js';
export const Plugin = {
    name: 'libmodulor-plugin',
    transform: (code, id) => {
        if (!isFileEligible(id, ['ts'])) {
            return {
                code,
            };
        }
        const transformed = transform(code, id);
        assertTransformedCorrectly(transformed, id);
        return {
            code: transformed,
        };
    },
};
