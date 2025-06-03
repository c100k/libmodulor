import { jsx as _jsx } from "react/jsx-runtime";
import { useDIContext } from './DIContextProvider.js';
import { UCContainer } from './UCContainer.js';
export function UCEntrypoint({ onPress, path, renderTouchable, uc }) {
    const { wordingManager } = useDIContext();
    const wording = wordingManager.uc(uc.def);
    return (_jsx(UCContainer, { uc: uc, children: renderTouchable({ onPress, path, uc, wording }) }));
}
