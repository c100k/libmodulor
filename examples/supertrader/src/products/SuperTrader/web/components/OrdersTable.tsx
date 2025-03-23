import { UC } from 'libmodulor';
import {
    UCPanel,
    type UCPanelOnError,
    useDIContext,
    type useUCOR,
} from 'libmodulor/react';
import { UCAutoExecLoader } from 'libmodulor/react-web-pure';
import React, { type ReactElement } from 'react';

import {
    CancelOrderUCD,
    type ListOrdersInput,
    type ListOrdersOPI0,
    Manifest,
} from '../../../../apps/Trading/index.js';
import { UCExecTouchable } from './UCExecTouchable.js';
import { UCForm } from './UCForm.js';
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
        <table className="table">
            <thead>
                <tr>
                    <th>#</th>
                    {listOrdersPart0?.fields.map((f) => (
                        <th key={f.key}>{wordingManager.ucof(f.key).label}</th>
                    ))}
                    <th />
                </tr>
            </thead>
            <tbody>
                {listOrdersPart0?.items.map((i, idx) => (
                    <tr key={i.id}>
                        <td>{idx + 1}</td>
                        {listOrdersPart0.fields.map((f) => (
                            <td key={f.key}>
                                <UCValue field={f} value={i[f.key]} />
                            </td>
                        ))}
                        <td>
                            <UCPanel
                                onDone={async (ucor) => update0(ucor)}
                                onError={onError}
                                renderAutoExecLoader={UCAutoExecLoader}
                                renderExecTouchable={UCExecTouchable}
                                renderForm={UCForm}
                                uc={new UC(Manifest, CancelOrderUCD, null).fill(
                                    { id: i.id },
                                )}
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <th />
                    <th>{i18nManager.t('total')}</th>
                    <th />
                    <th />
                    <th />
                    <th>{listOrdersPart0?.pagination.total}</th>
                </tr>
            </tfoot>
        </table>
    );
}
