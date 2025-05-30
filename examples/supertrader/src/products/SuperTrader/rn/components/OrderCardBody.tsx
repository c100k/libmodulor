import type { UCOutputReaderPart } from 'libmodulor';
import { useDIContext } from 'libmodulor/react';
import { UCOutputFieldValue } from 'libmodulor/react-native-pure';
import React, { type ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import type { ListOrdersOPI0 } from '../../../../apps/Trading/index.js';

interface Props {
    fields: UCOutputReaderPart<ListOrdersOPI0>['fields'];
    item: ListOrdersOPI0;
}

export default function OrderCardBody({ fields, item }: Props): ReactElement {
    const { wordingManager } = useDIContext();

    return (
        <>
            {fields.map((f) => (
                <View key={f.key}>
                    <Text style={styles.label}>
                        {wordingManager.ucof(f.key).label}
                    </Text>
                    <Text>
                        <UCOutputFieldValue f={f} value={item[f.key]} />
                    </Text>
                </View>
            ))}
        </>
    );
}

const styles = StyleSheet.create({
    label: {
        fontWeight: 'bold',
    },
});
