import { jsx as _jsx } from "react/jsx-runtime";
import { useDIContext } from '../lib/react/DIContextProvider.js';
import { useStyleContext } from '../lib/react/StyleContextProvider.js';
export function UCFormSubmitControl({ execState, disabled, uc, }) {
    const { wordingManager } = useDIContext();
    const { formSubmitControl } = useStyleContext();
    return (_jsx("input", { className: formSubmitControl?.className, disabled: disabled, style: formSubmitControl?.style, type: "submit", value: wordingManager.ucISubmit(uc.def, execState) }));
}
