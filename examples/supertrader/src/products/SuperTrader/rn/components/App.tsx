import { type Logger, type ProductManifest, UCOutputReader } from 'libmodulor';
import {
    UCPanel,
    type UCPanelOnError,
    useDIContext,
    useUC,
    useUCOR,
} from 'libmodulor/react';
import {
    UCAutoExecLoader,
    UCExecTouchable,
    UCForm,
} from 'libmodulor/react-native-pure';
import React, { useEffect, useState, type ReactElement } from 'react';
import { Text, View } from 'react-native';

import {
    BuyAssetUCD,
    ListOrdersUCD,
    Manifest,
} from '../../../../apps/Trading/index.js';

export default function App(): ReactElement {
    const { container, i18nManager, wordingManager } = useDIContext();
    const [logger] = useState(container.get<Logger>('Logger'));
    const [productManifest] = useState(
        container.get<ProductManifest>('ProductManifest'),
    );

    const [buyAssetUC] = useUC(Manifest, BuyAssetUCD, null);
    const [listOrdersUC] = useUC(Manifest, ListOrdersUCD, null);
    const [listOrdersPart0, _listOrdersPart1, { append0 }] = useUCOR(
        new UCOutputReader(ListOrdersUCD, undefined),
    );

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            logger.debug('Initializing i18n');
            await i18nManager.init();
            logger.debug('Done initializing i18n');
            setLoading(false);
        })();
    }, [i18nManager, logger]);

    const onError: UCPanelOnError = async (err) => alert(err.message);

    const { slogan } = wordingManager.p();
    const { label } = wordingManager.uc(buyAssetUC.def);
    const { label: idLabel } = wordingManager.ucof('id');
    const { label: isinLabel } = wordingManager.ucof('isin');
    const { label: limitLabel } = wordingManager.ucof('limit');
    const { label: qtyLabel } = wordingManager.ucof('qty');

    return (
        <View style={{ gap: 16, padding: 16 }}>
            {loading && <Text>Loading...</Text>}

            {!loading && (
                <>
                    <Text style={{ fontSize: 24 }}>
                        {productManifest.name} : {slogan}
                    </Text>

                    <Text style={{ fontSize: 16 }}>{label}</Text>

                    <UCPanel
                        clearAfterExec={false}
                        onDone={async (ucor) => append0(ucor)}
                        onError={onError}
                        renderAutoExecLoader={UCAutoExecLoader}
                        renderExecTouchable={UCExecTouchable}
                        renderForm={UCForm}
                        sleepInMs={200} // Fake delay to see submit wording changing
                        uc={buyAssetUC}
                    />

                    <UCPanel
                        autoExec={true}
                        onDone={async (ucor) => append0(ucor)}
                        renderAutoExecLoader={UCAutoExecLoader}
                        renderExecTouchable={UCExecTouchable}
                        renderForm={UCForm}
                        uc={listOrdersUC}
                    />

                    <View>
                        <View>
                            <View style={{ flexDirection: 'row', gap: 16 }}>
                                <Text>{idLabel}</Text>
                                <Text>{isinLabel}</Text>
                                <Text>{limitLabel}</Text>
                                <Text>{qtyLabel}</Text>
                            </View>
                        </View>
                        <View>
                            {listOrdersPart0?.items.map((i) => (
                                <View
                                    key={i.id}
                                    style={{ flexDirection: 'row', gap: 16 }}
                                >
                                    <Text>{i.id}</Text>
                                    <Text>{i.isin}</Text>
                                    <Text>{i.limit}</Text>
                                    <Text>{i.qty}</Text>
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
                </>
            )}
        </View>
    );
}
