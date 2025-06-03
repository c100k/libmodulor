import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState, } from 'react';
import { UCExecChecker, } from '../../../uc/index.js';
import { useDIContext } from './DIContextProvider.js';
export function UCContainer({ children, uc, }) {
    const { container } = useDIContext();
    const [isAllowed, setIsAllowed] = useState(undefined);
    const [ucExecChecker] = useState(container.get(UCExecChecker));
    useEffect(() => {
        (async () => {
            const { allowed } = await ucExecChecker.exec({
                lifecycle: 'client',
                uc,
            });
            setIsAllowed(allowed);
        })();
    }, [uc, ucExecChecker]);
    if (isAllowed === undefined) {
        // TODO : Add some loader while we check if can do
        return _jsx(_Fragment, {});
    }
    if (isAllowed === false) {
        return null;
    }
    return _jsx(_Fragment, { children: children });
}
