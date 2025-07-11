import { TString, } from '../../../dt/index.js';
import { ucifHint, ucifId } from '../../../uc/index.js';
export function rnInputDef(field, disabled, _errMsg) {
    const def = {
        internal: undefined,
        spec: {},
    };
    if (!def.spec) {
        // Just a guard to safely type the rest of the function without using !
        return def;
    }
    const { key, def: fDef } = field;
    const { type: fType } = fDef;
    def.spec.editable = !disabled;
    def.spec.id = ucifId(key);
    // Testing the types by usage probability to make the if/else evaluation stop ideally earlier
    if (fType instanceof TString) {
        const constraints = fType.getConstraints();
        if (constraints) {
            def.spec.maxLength = constraints.maxLength;
        }
        def.spec.multiline = fType.isPotentiallyLong();
    }
    def.spec.placeholder = ucifHint(fDef);
    def.spec.inputMode = fType.rnInputMode();
    def.spec.secureTextEntry = fType.isSensitive();
    return def;
}
