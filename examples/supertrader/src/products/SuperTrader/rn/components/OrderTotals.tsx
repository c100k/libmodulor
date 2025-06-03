import type { UCOutputReaderPart } from 'libmodulor';
import { useDIContext } from 'libmodulor/react';
import type { ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import type { ListOrdersOPI0 } from '../../../../apps/Trading/index.js';

interface Props {
    pagination: UCOutputReaderPart<ListOrdersOPI0>['pagination'];
}

export default function OrderTotals({
    pagination: { total },
}: Props): ReactElement {
    const { i18nManager } = useDIContext();

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{i18nManager.t('total')}</Text>
            <Text style={styles.text}>{total}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 16,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});
