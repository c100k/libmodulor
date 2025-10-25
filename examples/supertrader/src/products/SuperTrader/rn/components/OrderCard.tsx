import type { NumIndex, UCOutputReader, UCOutputReaderPart } from 'libmodulor';
import type { UCPanelOnError, UpdateFunc } from 'libmodulor/react';
import type { Dispatch, ReactElement, SetStateAction } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import type {
    ListOrdersOPI0,
    ViewAssetPriceInput,
    ViewAssetPriceOPI0,
} from '../../../../apps/Trading/index.js';
import CancelOrderUCPanel from './CancelOrderUCPanel.js';
import OrderCardBody from './OrderCardBody.js';
import ViewAssetPriceUCPanel, { type Prices } from './ViewAssetPriceUCPanel.js';

interface Props {
    fields: UCOutputReaderPart<ListOrdersOPI0>['fields'];
    item: ListOrdersOPI0;
    num: NumIndex;
    onError: UCPanelOnError;
    prices: Prices;
    setPrices: Dispatch<SetStateAction<Prices>>;
    ucor: UCOutputReader<ViewAssetPriceInput, ViewAssetPriceOPI0>;
    update0: UpdateFunc<ListOrdersOPI0>;
}

export default function OrderCard({
    fields,
    item,
    num,
    onError,
    prices,
    setPrices,
    ucor,
    update0,
}: Props): ReactElement {
    return (
        <View key={item.id} style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.num}>{num}</Text>

                <OrderCardBody fields={fields} item={item} />

                <ViewAssetPriceUCPanel
                    item={item}
                    prices={prices}
                    setPrices={setPrices}
                    ucor={ucor}
                />
            </View>

            <View style={styles.actions}>
                <CancelOrderUCPanel
                    item={item}
                    onError={onError}
                    update0={update0}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    actions: {
        width: '30%',
    },
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 4,
        justifyContent: 'space-between',
    },
    content: {
        width: '70%',
    },
    num: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});
