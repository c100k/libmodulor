import React, { useEffect, useState, } from 'react';
import { UCExecChecker, } from '../../../uc/index.js';
import { useDIContext } from './DIContextProvider.js';
export function UCContainer({ children, uc, }) {
    const { container } = useDIContext();
    const [isAllowed, setIsAllowed] = useState(undefined);
    const [ucExecChecker] = useState(container.resolve(UCExecChecker));
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
        return React.createElement(React.Fragment, null);
    }
    if (isAllowed === false) {
        return null;
    }
    return React.createElement(React.Fragment, null, children);
}
