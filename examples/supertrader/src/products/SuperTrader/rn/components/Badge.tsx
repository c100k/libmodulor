import type { Color, DataType, SemanticsVariant, TBase } from 'libmodulor';
import type { ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props<T extends DataType> {
    type: TBase<T>;
}

const SEMANTICS_VARIANT_COLORS_MAPPING: Record<SemanticsVariant, Color> = {
    danger: 'red',
    info: 'cyan',
    primary: 'blue',
    secondary: 'green',
    success: 'green',
    warning: 'orange',
};

export default function Badge<T extends DataType>({
    type,
}: Props<T>): ReactElement | null {
    const val = type.val();
    if (!val) {
        return <>{type.fmt()}</>;
    }

    const semantics = type.getSemanticsMapping()?.[val.toString()];

    let color = '';
    if (!semantics?.variant) {
        color = 'gray';
    } else {
        color = SEMANTICS_VARIANT_COLORS_MAPPING[semantics.variant];
    }

    return (
        <View style={[styles.container, { borderColor: color }]}>
            <Text style={[styles.text, { color }]}>{type.fmt()}</Text>
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
