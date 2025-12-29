import { type ReactElement, useState } from 'react';
import { Text, View } from 'react-native';

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
    ListOrdersUCD,
    ViewAssetPriceUCD,
} from '../../../../../../../apps/Trading/index.js';
import UCOPICard from '../../UCOPICard.jsx';
import CancelOrderUCPanel from './CancelOrderUCPanel.jsx';
import type { Prices } from './ViewAssetPriceUCPanel.jsx';
import ViewAssetPriceUCPanel from './ViewAssetPriceUCPanel.jsx';

interface Props {
    listOrdersPart0: UCOutputReaderPart<ListOrdersOPI0>;
    update0: UpdateFunc<ListOrdersOPI0>;
}

export default function OrdersList({
    listOrdersPart0,
    update0,
}: Props): ReactElement {
    const { wordingManager } = useDIContext();

    const [ucor] = useState(new UCOutputReader(ViewAssetPriceUCD, undefined));
    const [prices, setPrices] = useState<Prices>({});

    const { fields, items, pagination } = listOrdersPart0;
    const { total } = pagination;

    const { empty } = wordingManager.ucop(ListOrdersUCD, 0);
    if (total === 0 && empty) {
        return <Text>{empty}</Text>;
    }

    return (
        <View style={{ gap: 8 }}>
            {items.map((item, idx) => (
                <View key={item.id} style={{ gap: 8 }}>
                    <UCOPICard fields={fields} idx={idx} item={item} />

                    <ViewAssetPriceUCPanel
                        item={item}
                        prices={prices}
                        setPrices={setPrices}
                        ucor={ucor}
                    />

                    <View style={{ flexDirection: 'row', gap: 4 }}>
                        <CancelOrderUCPanel item={item} update0={update0} />
                    </View>
                </View>
            ))}
        </View>
    );
}
