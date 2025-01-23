import React, {} from 'react';
import { useDIContext } from '../../index.react.js';
export function UCExecTouchable({ disabled, execState, onSubmit, uc, }) {
    const { wordingManager } = useDIContext();
    const label = wordingManager.ucISubmit(uc.def, execState);
    return (React.createElement("button", { disabled: disabled, onClick: onSubmit, type: "button" }, label));
}
