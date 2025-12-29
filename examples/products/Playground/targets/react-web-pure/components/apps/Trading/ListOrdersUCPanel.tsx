import type { ReactElement } from 'react';

import type { UCOutputReaderPart } from '../../../../../../../../dist/esm/index.js';
import {
    type AppendFunc,
    UCContainer,
    type UpdateFunc,
    useUC,
} from '../../../../../../../../dist/esm/index.react.js';
import {
    type ListOrdersOPI0,
    ListOrdersUCD,
    Manifest,
} from '../../../../../../../apps/Trading/index.js';
import { useGlobalContext } from '../../GlobalContext.js';
import UCPanel from '../../UCPanel.js';
import OrdersTable from './OrdersTable.js';

interface Props {
    append0: AppendFunc<ListOrdersOPI0>;
    part0: UCOutputReaderPart<ListOrdersOPI0>;
    update0: UpdateFunc<ListOrdersOPI0>;
}

export default function ListOrdersUCPanel({
    append0,
    update0,
    part0,
}: Props): ReactElement {
    const { auth } = useGlobalContext();

    const [uc] = useUC(Manifest, ListOrdersUCD, auth);

    return (
        <>
            <UCPanel
                autoExec={true}
                onDone={async (ucor) => append0(ucor)}
                uc={uc}
            />
            <UCContainer uc={uc}>
                <OrdersTable part0={part0} update0={update0} />
            </UCContainer>
        </>
    );
}
