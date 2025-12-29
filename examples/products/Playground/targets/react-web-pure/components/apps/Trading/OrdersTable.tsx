import { type ReactElement, useState } from 'react';

import {
    UCOutputReader,
    type UCOutputReaderPart,
} from '../../../../../../../../dist/esm/index.js';
import {
    type UpdateFunc,
    useDIContext,
} from '../../../../../../../../dist/esm/index.react.js';
import {
    type ListOrdersOPI0,
    ViewAssetPriceUCD,
} from '../../../../../../../apps/Trading/index.js';
import UCOutputFieldValue from '../../UCOutputFieldValue.js';
import CancelOrderUCPanel from './CancelOrderUCPanel.js';
import ViewAssetPriceUCPanel, { type Prices } from './ViewAssetPriceUCPanel.js';

interface Props {
    part0: UCOutputReaderPart<ListOrdersOPI0>;
    update0: UpdateFunc<ListOrdersOPI0>;
}

export default function OrdersTable({ part0, update0 }: Props): ReactElement {
    const { i18nManager, wordingManager } = useDIContext();

    const [ucor] = useState(new UCOutputReader(ViewAssetPriceUCD, undefined));
    const [prices, setPrices] = useState<Prices>({});

    const {
        fields,
        items,
        pagination: { total },
    } = part0;

    return (
        <table>
            <thead>
                <tr>
                    <th>#️⃣</th>
                    {fields.map((f) => (
                        <th key={f.key}>{wordingManager.ucof(f.key).label}</th>
                    ))}
                    <th style={{ minWidth: 200 }}>📈</th>
                    <th
                        style={{
                            minWidth: 150,
                        }}
                    >
                        🛠️
                    </th>
                </tr>
            </thead>
            <tbody>
                {items.map((item, idx) => (
                    <tr key={item.id}>
                        <td>{idx + 1}</td>
                        {fields.map((f) => (
                            <td key={f.key}>
                                <UCOutputFieldValue f={f} value={item[f.key]} />
                            </td>
                        ))}
                        <td>
                            <ViewAssetPriceUCPanel
                                item={item}
                                prices={prices}
                                setPrices={setPrices}
                                ucor={ucor}
                            />
                        </td>
                        <td>
                            <div
                                style={{
                                    display: 'inline-flex',
                                    gap: 4,
                                }}
                            >
                                <CancelOrderUCPanel
                                    item={item}
                                    update0={update0}
                                />
                            </div>
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
