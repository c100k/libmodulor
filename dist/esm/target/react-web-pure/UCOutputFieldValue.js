import { jsx as _jsx } from "react/jsx-runtime";
import { useStyleContext } from '../lib/react/StyleContextProvider.js';
import { UCOutputFieldValueFragment, } from '../lib/react/UCOutputFieldValueFragment.js';
export function UCOutputFieldValue(props) {
    const { outputFieldValue } = useStyleContext();
    return (_jsx("span", { className: outputFieldValue?.className, style: outputFieldValue?.style, children: _jsx(UCOutputFieldValueFragment, { ...props }) }));
}
