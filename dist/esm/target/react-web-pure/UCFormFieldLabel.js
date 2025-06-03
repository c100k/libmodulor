import { jsxs as _jsxs } from "react/jsx-runtime";
import { ucifId, ucifIsMandatory } from '../../uc/index.js';
import { useDIContext } from '../lib/react/DIContextProvider.js';
import { useStyleContext } from '../lib/react/StyleContextProvider.js';
export function UCFormFieldLabel({ f, }) {
    const { wordingManager } = useDIContext();
    const { formFieldLabel } = useStyleContext();
    const { label } = wordingManager.ucif(f);
    const mandatory = ucifIsMandatory(f.def);
    return (_jsxs("label", { className: formFieldLabel?.className, htmlFor: ucifId(f.key), style: formFieldLabel?.style, children: [label, mandatory && ' *'] }));
}
