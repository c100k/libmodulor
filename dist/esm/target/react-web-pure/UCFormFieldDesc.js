import React, {} from 'react';
import { useDIContext } from '../lib/react/DIContextProvider.js';
export function UCFormFieldDesc({ f, }) {
    const { wordingManager } = useDIContext();
    const { desc } = wordingManager.ucif(f);
    if (!desc) {
        return null;
    }
    return React.createElement("div", null, desc);
}
