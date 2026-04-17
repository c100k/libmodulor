import type { ReactElement } from 'react';
import { Text } from 'react-native';

import type { ErrorCode } from '../../../../../../dist/esm/index.js';
import { useDIContext } from '../../../../../../dist/esm/index.react.js';

interface Props {
    errCode: ErrorCode;
}

export default function ErrMessage({ errCode }: Props): ReactElement {
    const { i18nManager } = useDIContext();

    return <Text style={{ color: 'red' }}>{i18nManager.t(errCode)}</Text>;
}
