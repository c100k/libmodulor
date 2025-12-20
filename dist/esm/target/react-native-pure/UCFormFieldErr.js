import { jsx as _jsx } from "react/jsx-runtime";
import { Text } from 'react-native';
import { useStyleContext } from '../lib/react/StyleContextProvider.js';
export function UCFormFieldErr({ errMsg, }) {
    const { formFieldErr } = useStyleContext();
    if (!errMsg) {
        return null;
    }
    return _jsx(Text, { style: formFieldErr?.style, children: errMsg });
}
