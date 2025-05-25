import React, {} from 'react';
import { useDIContext } from '../lib/react/DIContextProvider.js';
export function UCExecTouchable({ className, disabled, execState, onSubmit, uc, }) {
    const { wordingManager } = useDIContext();
    const label = wordingManager.ucISubmit(uc.def, execState);
    return (React.createElement("button", { className: className, disabled: disabled, onClick: onSubmit, type: "button" }, label));
}
