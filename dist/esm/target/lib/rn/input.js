import { TString, } from '../../../dt/index.js';
import { ucIsDisabled, ucifHint, ucifId, } from '../../../uc/index.js';
export function rnInputDef(field, execState, _errMsg) {
    const def = {
        internal: undefined,
        spec: {},
    };
    if (!def.spec) {
        return def;
    }
    const { key, def: fDef } = field;
    const { type: fType } = fDef;
    def.spec.editable = !ucIsDisabled(execState);
    def.spec.id = ucifId(key);
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
