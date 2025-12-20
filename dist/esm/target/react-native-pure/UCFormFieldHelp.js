import { jsx as _jsx } from "react/jsx-runtime";
import { Text } from 'react-native';
import { useDIContext } from '../../index.react.js';
import { useStyleContext } from '../lib/react/StyleContextProvider.js';
export function UCFormFieldHelp({ f, }) {
    const { wordingManager } = useDIContext();
    const { formFieldHelp } = useStyleContext();
    const { def: { type }, } = f;
    const parts = wordingManager.dtConstr(type);
    if (!parts) {
        return null;
    }
    const text = parts.join(' - ');
    return _jsx(Text, { style: formFieldHelp?.style, children: text });
}
