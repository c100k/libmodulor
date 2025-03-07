import { type DataType, ucifId } from 'libmodulor';
import { useDIContext } from 'libmodulor/react';
import React, { type ReactElement } from 'react';
import {
    type Props as FormFieldControlProps,
    UCFormFieldControl,
} from './UCFormFieldControl.js';

export function UCFormField<T extends DataType>({
    disabled,
    execState,
    field,
    onChange,
}: FormFieldControlProps<T>): ReactElement {
    const { wordingManager } = useDIContext();

    const { label } = wordingManager.ucif(field);

    return (
        <label className="floating-label" htmlFor={ucifId(field.key)}>
            <span>{label}</span>
            <UCFormFieldControl
                disabled={disabled}
                execState={execState}
                field={field}
                onChange={onChange}
            />
        </label>
    );
}
