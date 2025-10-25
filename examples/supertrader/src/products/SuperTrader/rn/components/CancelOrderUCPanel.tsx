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

import {
    CancelOrderUCD,
    type ListOrdersOPI0,
    Manifest,
} from '../../../../apps/Trading/index.js';

interface Props {
    item: ListOrdersOPI0;
    onError: UCPanelOnError;
    update0: UpdateFunc<ListOrdersOPI0>;
}

export default function CancelOrderUCPanel({
    item,
    onError,
    update0,
}: Props): ReactElement {
    const [uc] = useUC(Manifest, CancelOrderUCD, null, {
        fillWith: { id: item.id },
    });

    return (
        <UCPanel
            onDone={async (ucor) => update0(ucor)}
            onError={onError}
            renderAutoExecLoader={UCAutoExecLoader}
            renderExecTouchable={UCExecTouchable}
            renderForm={UCForm}
            uc={uc}
        />
    );
}
