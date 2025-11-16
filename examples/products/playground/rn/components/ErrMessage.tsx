import type { ReactElement } from 'react';
import { Text } from 'react-native';

import type { ErrorMessage } from '../../../../../dist/esm/index.js';

interface Props {
    errMsg: ErrorMessage;
}

export default function ErrMessage({ errMsg }: Props): ReactElement {
    return <Text style={{ color: 'red' }}>{errMsg}</Text>;
}
