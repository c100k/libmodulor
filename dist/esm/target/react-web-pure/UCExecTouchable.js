import React, {} from 'react';
import { useDIContext } from '../lib/react/DIContextProvider.js';
import { useStyleContext } from '../lib/react/StyleContextProvider.js';
export function UCExecTouchable({ disabled, execState, onSubmit, uc, }) {
    const { wordingManager } = useDIContext();
    const { execTouchable } = useStyleContext();
    const label = wordingManager.ucISubmit(uc.def, execState);
    return (React.createElement("button", { className: execTouchable?.className, disabled: disabled, onClick: onSubmit, style: execTouchable?.style, type: "button" }, label));
}
