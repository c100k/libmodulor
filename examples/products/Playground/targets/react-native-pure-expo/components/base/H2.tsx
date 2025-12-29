import type { ReactElement } from 'react';
import { Text } from 'react-native';

interface Props {
    value: string;
}

export default function H2({ value }: Props): ReactElement {
    return <Text style={{ fontSize: 18, fontWeight: 'medium' }}>{value}</Text>;
}
