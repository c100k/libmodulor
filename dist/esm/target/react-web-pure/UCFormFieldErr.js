import React, {} from 'react';
import { useStyleContext } from '../lib/react/StyleContextProvider.js';
export function UCFormFieldErr({ errMsg }) {
    const { formFieldErr } = useStyleContext();
    return (React.createElement("div", { className: formFieldErr?.className, style: formFieldErr?.style }, errMsg));
}
