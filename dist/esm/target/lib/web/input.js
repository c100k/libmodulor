import { TNumber, TString, } from '../../../dt/index.js';
import { ucIsDisabled, ucifHint, ucifId, ucifIsMandatory, } from '../../../uc/index.js';
export function htmlInputDef(field, execState, errMsg, className) {
    const def = {
        internal: {},
        spec: {},
    };
    if (!def.internal || !def.spec) {
        // Just a guard to safely type the rest of the function without using !
        return def;
    }
    const { key, def: fDef } = field;
    const { type: fType } = fDef;
    def.spec.className = className;
    def.spec.disabled = ucIsDisabled(execState);
    def.spec.id = ucifId(key);
    def.spec.name = key;
    // Testing the types by usage probability to make the if/else evaluation stop ideally earlier
    if (fType instanceof TString) {
        const constraints = fType.getConstraints();
        if (constraints) {
            def.spec.maxLength = constraints.maxLength;
            def.spec.minLength = constraints.minLength;
            // https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/pattern
            // > No forward slashes should be specified around the pattern text
            def.spec.pattern = constraints.format?.regexp?.source;
        }
        def.internal.multiline = fType.isPotentiallyLong();
    }
    else if (fType instanceof TNumber) {
        def.spec.max = fType.max();
        def.spec.min = fType.min();
        def.spec.step = fType.getStep();
    }
    def.spec.placeholder = ucifHint(fDef);
    def.spec.required = ucifIsMandatory(fDef);
    def.spec.type = fType.htmlInputType();
    if (fType.isSensitive()) {
        def.spec.type = 'password';
    }
    if (errMsg !== null) {
        def.spec['aria-errormessage'] = errMsg;
        def.spec['aria-invalid'] = true;
    }
    return def;
}
