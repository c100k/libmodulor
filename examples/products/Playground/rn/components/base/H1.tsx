import type { ReactElement } from 'react';
import { Text } from 'react-native';

interface Props {
    value: string;
}

export default function H1({ value }: Props): ReactElement {
    return <Text style={{ fontSize: 20, fontWeight: 'medium' }}>{value}</Text>;
}
