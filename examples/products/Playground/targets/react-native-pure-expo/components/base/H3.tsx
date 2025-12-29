import type { ReactElement } from 'react';
import { Text } from 'react-native';

interface Props {
    value: string;
}

export default function H3({ value }: Props): ReactElement {
    return <Text style={{ fontSize: 16, fontWeight: 'medium' }}>{value}</Text>;
}
