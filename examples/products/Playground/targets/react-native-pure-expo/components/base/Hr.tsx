import type { ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';

export default function Hr(): ReactElement {
    return (
        <View
            style={{
                borderBottomColor: '#ccc',
                borderBottomWidth: StyleSheet.hairlineWidth,
                marginVertical: 16,
            }}
        />
    );
}
