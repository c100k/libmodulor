import type { ReactElement } from 'react';

import type { ErrorCode } from '../../../../../../dist/esm/index.js';
import { useDIContext } from '../../../../../../dist/esm/index.react.js';

interface Props {
    errCode: ErrorCode;
}

export default function ErrMessage({ errCode }: Props): ReactElement {
    const { i18nManager } = useDIContext();

    return <span style={{ color: 'red' }}>{i18nManager.t(errCode)}</span>;
}
