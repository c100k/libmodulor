import {
    type DataType,
    type ErrorMessage,
    type UCInputField,
    UCInputFieldChangeOperator,
} from 'libmodulor';
import type {
    UCFormFieldControlOnChange,
    UCPanelState,
} from 'libmodulor/react';
import { htmlInputDef } from 'libmodulor/web';
import React, { type ReactElement } from 'react';

export type Props<T extends DataType> = UCPanelState & {
    errMsg?: ErrorMessage | null;
    field: UCInputField<T>;
    onChange: UCFormFieldControlOnChange<T>;
};

export function UCFormFieldControl<T extends DataType>({
    errMsg = null,
    execState,
    field,
    onChange,
}: Props<T>): ReactElement {
    const attrs = htmlInputDef(field, execState, errMsg);

    if (attrs.internal?.multiline) {
        return (
            <textarea
                {...attrs.spec}
                className="textarea"
                onChange={(e) =>
                    onChange(
                        field,
                        UCInputFieldChangeOperator.SET,
                        e.currentTarget.value as T,
                    )
                }
            />
        );
    }

    return (
        <input
            {...attrs.spec}
            className="w-full max-w-md px-4 py-2 border border-gray-700 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            onChange={(e) =>
                onChange(
                    field,
                    UCInputFieldChangeOperator.SET,
                    e.currentTarget.value as T,
                )
            }
        />
    );
}
