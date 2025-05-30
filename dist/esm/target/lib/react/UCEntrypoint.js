import React, {} from 'react';
import { useDIContext } from './DIContextProvider.js';
import { UCContainer } from './UCContainer.js';
export function UCEntrypoint({ onPress, path, renderTouchable, uc }) {
    const { wordingManager } = useDIContext();
    const wording = wordingManager.uc(uc.def);
    return (React.createElement(UCContainer, { uc: uc }, renderTouchable({ onPress, path, uc, wording })));
}
