import React, {} from 'react';
import { useDIContext } from '../lib/react/DIContextProvider.js';
import { useStyleContext } from '../lib/react/StyleContextProvider.js';
export function UCFormSubmitControl({ execState, disabled, uc, }) {
    const { wordingManager } = useDIContext();
    const { formSubmitControl } = useStyleContext();
    return (React.createElement("input", { className: formSubmitControl?.className, disabled: disabled, style: formSubmitControl?.style, type: "submit", value: wordingManager.ucISubmit(uc.def, execState) }));
}
