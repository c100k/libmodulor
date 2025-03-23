import { UC } from 'libmodulor';
import {
    UCPanel,
    type UCPanelOnError,
    useDIContext,
    type useUCOR,
} from 'libmodulor/react';
import {
    UCAutoExecLoader,
    UCExecTouchable,
    UCForm,
} from 'libmodulor/react-native-pure';
import React, { type ReactElement } from 'react';
import { Text, View } from 'react-native';

import {
    CancelOrderUCD,
    type ListOrdersInput,
    type ListOrdersOPI0,
    Manifest,
} from '../../../../apps/Trading/index.js';
import UCValue from './UCValue.js';

interface Props {
    listOrdersPart0: ReturnType<
        typeof useUCOR<ListOrdersInput, ListOrdersOPI0>
    >['0'];
    onError: UCPanelOnError;
    update0: ReturnType<
        typeof useUCOR<ListOrdersInput, ListOrdersOPI0>
    >['2']['update0'];
}

export default function OrdersTable({
    listOrdersPart0,
    onError,
    update0,
}: Props): ReactElement {
    const { i18nManager, wordingManager } = useDIContext();

    return (
        <View>
            <View>
                <View style={{ flexDirection: 'row', gap: 16 }}>
                    <Text>#</Text>
                    {listOrdersPart0?.fields.map((f) => (
                        <Text key={f.key}>
                            {wordingManager.ucof(f.key).label}
                        </Text>
                    ))}
                    <Text />
                </View>
            </View>
            <View>
                {listOrdersPart0?.items.map((i, idx) => (
                    <View key={i.id} style={{ flexDirection: 'row', gap: 16 }}>
                        <Text>{idx + 1}</Text>
                        {listOrdersPart0.fields.map((f) => (
                            <Text key={f.key}>
                                <UCValue field={f} value={i[f.key]} />
                            </Text>
                        ))}
                        <UCPanel
                            onDone={async (ucor) => update0(ucor)}
                            onError={onError}
                            renderAutoExecLoader={UCAutoExecLoader}
                            renderExecTouchable={UCExecTouchable}
                            renderForm={UCForm}
                            uc={new UC(Manifest, CancelOrderUCD, null).fill({
                                id: i.id,
                            })}
                        />
                    </View>
                ))}
            </View>
            <View>
                <View style={{ flexDirection: 'row', gap: 16 }}>
                    <Text>{i18nManager.t('total')}</Text>
                    <Text>{listOrdersPart0?.pagination.total}</Text>
                </View>
            </View>
        </View>
    );
}
