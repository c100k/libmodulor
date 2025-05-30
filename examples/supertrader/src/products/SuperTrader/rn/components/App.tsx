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
import { ScrollView, Text } from 'react-native';

import {
    BuyAssetUCD,
    ListOrdersUCD,
    Manifest,
} from '../../../../apps/Trading/index.js';
import H1 from './H1.js';
import H2 from './H2.js';
import OrdersTable from './OrdersTable.js';

export default function App(): ReactElement {
    const { container, i18nManager, wordingManager } = useDIContext();
    const [logger] = useState(container.get<Logger>('Logger'));
    const [productManifest] = useState(
        container.get<ProductManifest>('ProductManifest'),
    );

    const [buyAssetUC] = useUC(Manifest, BuyAssetUCD, null);
    const [listOrdersUC] = useUC(Manifest, ListOrdersUCD, null);
    const [listOrdersPart0, _listOrdersPart1, { append0, update0 }] = useUCOR(
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
    const { label: buyAssetLabel } = wordingManager.uc(buyAssetUC.def);
    const { label: listOrdersLabel } = wordingManager.uc(listOrdersUC.def);

    return (
        <ScrollView contentContainerStyle={{ gap: 16, padding: 16 }}>
            {loading && <Text>Loading...</Text>}

            {!loading && (
                <>
                    <H1>
                        {productManifest.name} : {slogan}
                    </H1>

                    <H2>{buyAssetLabel}</H2>

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

                    <H2>{listOrdersLabel}</H2>

                    <UCPanel
                        autoExec={true}
                        onDone={async (ucor) => append0(ucor)}
                        renderAutoExecLoader={UCAutoExecLoader}
                        renderExecTouchable={UCExecTouchable}
                        renderForm={UCForm}
                        uc={listOrdersUC}
                    />

                    <OrdersTable
                        listOrdersPart0={listOrdersPart0}
                        onError={onError}
                        update0={update0}
                    />
                </>
            )}
        </ScrollView>
    );
}
