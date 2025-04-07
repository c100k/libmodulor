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
            className="input"
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
