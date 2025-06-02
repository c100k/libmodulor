import type { Color, DataType, SemanticsVariant, TBase } from 'libmodulor';
import React, { type ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props<T extends DataType> {
    type: TBase<T>;
    value: string;
}

const SEMANTICS_VARIANT_BADGE_CLASSES_MAPPING: Record<SemanticsVariant, Color> =
    {
        danger: 'red',
        info: 'cyan',
        primary: 'blue',
        secondary: 'green',
        success: 'green',
        warning: 'orange',
    };

export default function Badge<T extends DataType>({
    type,
    value,
}: Props<T>): ReactElement | null {
    const semantics = type.getSemanticsMapping()?.[value];

    let color = '';
    if (!semantics?.variant) {
        color = 'gray';
    } else {
        color = SEMANTICS_VARIANT_BADGE_CLASSES_MAPPING[semantics.variant];
    }

    return (
        <View style={[styles.container, { borderColor: color }]}>
            <Text style={[styles.text, { color }]}>{value}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 4,
        borderWidth: 1,
        padding: 2,
    },
    text: {
        fontWeight: 'bold',
    },
});
