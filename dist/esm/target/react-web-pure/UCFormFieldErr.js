import { jsx as _jsx } from "react/jsx-runtime";
import { useStyleContext } from '../lib/react/StyleContextProvider.js';
export function UCFormFieldErr({ errMsg, }) {
    const { formFieldErr } = useStyleContext();
    if (!errMsg) {
        return null;
    }
    return (_jsx("div", { className: formFieldErr?.className, style: formFieldErr?.style, children: errMsg }));
}
