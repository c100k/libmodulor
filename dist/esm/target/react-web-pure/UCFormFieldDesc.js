import React, {} from 'react';
import { useDIContext } from '../lib/react/DIContextProvider.js';
export function UCFormFieldDesc({ field, }) {
    const { wordingManager } = useDIContext();
    const { desc } = wordingManager.ucif(field);
    if (!desc) {
        return null;
    }
    return React.createElement("div", null, desc);
}
