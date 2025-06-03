import type { NumIndex, UCOutputReaderPart } from 'libmodulor';
import {
    UCPanel,
    type UCPanelOnError,
    type UpdateFunc,
    useUC,
} from 'libmodulor/react';
import {
    UCAutoExecLoader,
    UCExecTouchable,
    UCForm,
} from 'libmodulor/react-native-pure';
import type { ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {
    CancelOrderUCD,
    type ListOrdersOPI0,
    Manifest,
} from '../../../../apps/Trading/index.js';
import OrderCardBody from './OrderCardBody.js';

interface Props {
    fields: UCOutputReaderPart<ListOrdersOPI0>['fields'];
    item: ListOrdersOPI0;
    num: NumIndex;
    onError: UCPanelOnError;
    update0: UpdateFunc<ListOrdersOPI0>;
}

export default function OrderCard({
    fields,
    item,
    num,
    onError,
    update0,
}: Props): ReactElement {
    const [deleteUC] = useUC(Manifest, CancelOrderUCD, null, {
        fillWith: { id: item.id },
    });

    return (
        <View key={item.id} style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.num}>{num}</Text>

                <OrderCardBody fields={fields} item={item} />
            </View>

            <View style={styles.actions}>
                <UCPanel
                    onDone={async (ucor) => update0(ucor)}
                    onError={onError}
                    renderAutoExecLoader={UCAutoExecLoader}
                    renderExecTouchable={UCExecTouchable}
                    renderForm={UCForm}
                    uc={deleteUC}
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
