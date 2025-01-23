import React, {} from 'react';
import { useDIContext } from './DIContextProvider.js';
import { UCContainer } from './UCContainer.js';
export function UCEntrypoint({ path, renderTouchable, uc }) {
    const { wordingManager } = useDIContext();
    const wording = wordingManager.uc(uc.def);
    return (React.createElement(UCContainer, { uc: uc }, renderTouchable({ path, uc, wording })));
}
