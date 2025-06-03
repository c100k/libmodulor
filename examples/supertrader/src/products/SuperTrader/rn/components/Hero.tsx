import type { ReactElement } from 'react';
import { Text, View } from 'react-native';

interface Props {
    message: string;
}

export function Hero({ message }: Props): ReactElement {
    return (
        <View>
            <Text>{message}</Text>
        </View>
    );
}
