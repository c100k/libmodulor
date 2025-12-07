import { types as t } from '@babel/core';
import { UC_LIFECYCLE_PROP_NAME, UC_LIFECYCLE_SERVER_PROP_NAME, } from '../../../convention.js';
import { isFileEligible } from '../funcs.js';
// Using `PluginObj` instead of `satisfies PluginObj`.
// Otherwise TypeScript is not happy and triggers a TS2209.
export const Plugin = {
    name: 'libmodulor-plugin',
    visitor: {
        ObjectExpression(path, state) {
            if (!isFileEligible(state.filename, ['js', 'ts'])) {
                return;
            }
            const lifecycle = findLifecycleProp(path);
            if (!lifecycle) {
                return;
            }
            const lifecycleObj = lifecycle.value;
            const server = findServerProp(lifecycleObj);
            if (!server) {
                return;
            }
            server.value = t.booleanLiteral(true);
        },
    },
};
function findLifecycleProp(path) {
    return path.node.properties.find((p) => t.isObjectProperty(p) &&
        t.isIdentifier(p.key, {
            name: UC_LIFECYCLE_PROP_NAME,
        }) &&
        t.isObjectExpression(p.value));
}
function findServerProp(lifecycleObj) {
    return lifecycleObj.properties.find((p) => t.isObjectProperty(p) &&
        t.isIdentifier(p.key, {
            name: UC_LIFECYCLE_SERVER_PROP_NAME,
        }));
}
