import { type DataType, ucifId } from 'libmodulor';
import { useDIContext } from 'libmodulor/react';
import React, { type ReactElement } from 'react';

import {
    type Props as FormFieldControlProps,
    UCFormFieldControl,
} from './UCFormFieldControl';

export function UCFormField<T extends DataType>({
    disabled,
    execState,
    field,
    onChange,
}: FormFieldControlProps<T>): ReactElement {
    const { wordingManager } = useDIContext();

    const { label } = wordingManager.ucif(field);

    return (
        <div>
            <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor={ucifId(field.key)}
            >
                {label}
            </label>
            <UCFormFieldControl
                disabled={disabled}
                execState={execState}
                field={field}
                onChange={onChange}
            />
        </div>
    );
}
