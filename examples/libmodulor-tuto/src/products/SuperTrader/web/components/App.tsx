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
} from 'libmodulor/react-web-pure';
import React, { useEffect, useState, type ReactElement } from 'react';

import { BuyAssetUCD, Manifest } from '../../../../apps/Trading/index.js';

export default function App(): ReactElement {
    const { container, i18nManager, wordingManager } = useDIContext();
    const [logger] = useState(container.get<Logger>('Logger'));
    const [productManifest] = useState(
        container.get<ProductManifest>('ProductManifest'),
    );

    const [buyAssetUC] = useUC(Manifest, BuyAssetUCD, null);
    const [buyAssetPart0, _buyAssetPart1, { append0 }] = useUCOR(
        new UCOutputReader(BuyAssetUCD, undefined),
    );

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            logger.debug('Initializing i18n');
            await i18nManager.init();
            logger.debug('Done initializing i18n');
            setLoading(false);
        })();

        const { slogan } = wordingManager.p();
        document.title = `${productManifest.name} : ${slogan}`;
    }, [i18nManager, logger, productManifest, wordingManager]);

    const onError: UCPanelOnError = async (err) => alert(err.message);

    const { slogan } = wordingManager.p();
    const { label } = wordingManager.uc(buyAssetUC.def);
    const { label: idLabel } = wordingManager.ucof('id');
    const { label: executedDirectlyLabel } =
        wordingManager.ucof('executedDirectly');

    return (
        <div>
            {loading && 'Loading...'}

            {!loading && (
                <>
                    <h1>
                        {productManifest.name} : {slogan}
                    </h1>

                    <h2>{label}</h2>

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

                    <table>
                        <thead>
                            <tr>
                                <th>{idLabel}</th>
                                <th>{executedDirectlyLabel}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {buyAssetPart0?.items.map((i) => (
                                <tr key={i.id}>
                                    <td>{i.id}</td>
                                    <td>{i.executedDirectly ? '✅' : '❌'}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th>{i18nManager.t('total')}</th>
                                <th>{buyAssetPart0?.pagination.total}</th>
                            </tr>
                        </tfoot>
                    </table>
                </>
            )}
        </div>
    );
}
