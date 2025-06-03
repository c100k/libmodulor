import { jsx as _jsx } from "react/jsx-runtime";
import { useDIContext } from '../lib/react/DIContextProvider.js';
import { useStyleContext } from '../lib/react/StyleContextProvider.js';
export function UCFormFieldDesc({ f, }) {
    const { wordingManager } = useDIContext();
    const { formFieldDesc } = useStyleContext();
    const { desc } = wordingManager.ucif(f);
    if (!desc) {
        return null;
    }
    return (_jsx("div", { className: formFieldDesc?.className, style: formFieldDesc?.style, children: desc }));
}
