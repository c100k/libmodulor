import type { ReactElement } from 'react';

import {
    type UpdateFunc,
    useUC,
} from '../../../../../../../dist/esm/index.react.js';
import {
    CancelOrderUCD,
    type ListOrdersOPI0,
    Manifest,
} from '../../../../../../apps/Trading/index.js';
import { useGlobalContext } from '../../GlobalContext.js';
import UCPanel from '../../UCPanel.js';

interface Props {
    item: ListOrdersOPI0;
    update0: UpdateFunc<ListOrdersOPI0>;
}

export default function CancelOrderUCPanel({
    item,
    update0,
}: Props): ReactElement {
    const { auth } = useGlobalContext();

    const [uc] = useUC(Manifest, CancelOrderUCD, auth, {
        fillWith: { id: item.id },
    });

    return <UCPanel onDone={async (ucor) => update0(ucor)} uc={uc} />;
}
