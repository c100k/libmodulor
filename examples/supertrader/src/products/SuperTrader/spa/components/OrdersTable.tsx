import { UCOutputReader, type UCOutputReaderPart } from 'libmodulor';
import {
    type UCPanelOnError,
    type UpdateFunc,
    useDIContext,
} from 'libmodulor/react';
import { type ReactElement, useState } from 'react';

import {
    type ListOrdersOPI0,
    ListOrdersUCD,
    ViewAssetPriceUCD,
} from '../../../../apps/Trading/index.js';
import CancelOrderUCPanel from './CancelOrderUCPanel.js';
import { Hero } from './Hero.js';
import UCOutputFieldValue from './UCOutputFieldValue.js';
import ViewAssetPriceUCPanel, { type Prices } from './ViewAssetPriceUCPanel.js';

interface Props {
    listOrdersPart0: UCOutputReaderPart<ListOrdersOPI0>;
    onError: UCPanelOnError;
    update0: UpdateFunc<ListOrdersOPI0>;
}

export default function OrdersTable({
    listOrdersPart0,
    onError,
    update0,
}: Props): ReactElement {
    const { i18nManager, wordingManager } = useDIContext();

    const [ucor] = useState(new UCOutputReader(ViewAssetPriceUCD, undefined));
    const [prices, setPrices] = useState<Prices>({});

    const {
        fields,
        items,
        pagination: { total },
    } = listOrdersPart0;

    const { empty } = wordingManager.ucop(ListOrdersUCD, 0);
    if (total === 0 && empty) {
        return <Hero message={empty} />;
    }

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>#</th>
                    {fields.map((f) => (
                        <th key={f.key}>{wordingManager.ucof(f.key).label}</th>
                    ))}
                    <th className="min-w-96">$$$</th>
                    <th className="min-w-48" />
                </tr>
            </thead>
            <tbody>
                {items.map((i, idx) => (
                    <tr key={i.id}>
                        <td>{idx + 1}</td>
                        {fields.map((f) => (
                            <td key={f.key}>
                                <UCOutputFieldValue f={f} value={i[f.key]} />
                            </td>
                        ))}
                        <td>
                            <ViewAssetPriceUCPanel
                                item={i}
                                prices={prices}
                                setPrices={setPrices}
                                ucor={ucor}
                            />
                        </td>
                        <td>
                            <CancelOrderUCPanel
                                item={i}
                                onError={onError}
                                update0={update0}
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <th>{i18nManager.t('total')}</th>
                    {fields.map((f) => (
                        <th key={f.key} />
                    ))}
                    <th />
                    <th>{total}</th>
                </tr>
            </tfoot>
        </table>
    );
}
