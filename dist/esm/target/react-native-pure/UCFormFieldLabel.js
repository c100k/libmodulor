import { jsxs as _jsxs } from "react/jsx-runtime";
import { Text } from 'react-native';
import { ucifIsMandatory } from '../../uc/index.js';
import { useDIContext } from '../lib/react/DIContextProvider.js';
import { useStyleContext } from '../lib/react/StyleContextProvider.js';
export function UCFormFieldLabel({ f, }) {
    const { wordingManager } = useDIContext();
    const { formFieldLabel } = useStyleContext();
    const { label } = wordingManager.ucif(f);
    const mandatory = ucifIsMandatory(f.def);
    return (_jsxs(Text, { style: formFieldLabel?.style, children: [label, mandatory && ' *'] }));
}
