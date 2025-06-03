import { jsx as _jsx } from "react/jsx-runtime";
import { useStyleContext } from '../lib/react/StyleContextProvider.js';
export function UCAutoExecLoader() {
    const { autoExecLoader } = useStyleContext();
    return (_jsx("div", { className: autoExecLoader?.className, style: autoExecLoader?.style, children: "..." }));
}
