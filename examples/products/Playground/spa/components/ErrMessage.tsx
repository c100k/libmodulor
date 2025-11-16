import type { ReactElement } from 'react';

import type { ErrorMessage } from '../../../../../dist/esm/index.js';

interface Props {
    errMsg: ErrorMessage;
}

export default function ErrMessage({ errMsg }: Props): ReactElement {
    return <span style={{ color: 'red' }}>{errMsg}</span>;
}
