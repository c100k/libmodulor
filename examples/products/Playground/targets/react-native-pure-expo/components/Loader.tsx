import type { ReactElement } from 'react';
import { ActivityIndicator } from 'react-native';

interface Props {
    size?: number;
}

export default function Loader({ size = 40 }: Props): ReactElement {
    return <ActivityIndicator size={size} />;
}
