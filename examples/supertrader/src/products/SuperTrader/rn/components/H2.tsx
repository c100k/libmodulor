import React, { type PropsWithChildren, type ReactElement } from 'react';
import { StyleSheet, Text } from 'react-native';

export default function H2({ children }: PropsWithChildren): ReactElement {
    return <Text style={styles.container}>{children}</Text>;
}

const styles = StyleSheet.create({
    container: {
        fontSize: 20,
    },
});
