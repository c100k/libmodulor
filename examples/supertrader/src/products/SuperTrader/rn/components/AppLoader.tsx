import type { ReactElement } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

export default function AppLoader(): ReactElement {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        height: 200,
    },
});
