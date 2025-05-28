import { type DataType, ucifId } from 'libmodulor';
import { type UCFormFieldProps, useDIContext } from 'libmodulor/react';
import React, { type ReactElement } from 'react';

import { UCFormFieldControl } from './UCFormFieldControl.js';

export function UCFormField<T extends DataType>({
    disabled,
    execState,
    f,
    onChange,
}: UCFormFieldProps<T>): ReactElement {
    const { wordingManager } = useDIContext();

    const { label } = wordingManager.ucif(f);

    return (
        <label className="floating-label" htmlFor={ucifId(f.key)}>
            <span>{label}</span>
            <UCFormFieldControl
                disabled={disabled}
                execState={execState}
                f={f}
                onChange={onChange}
            />
        </label>
    );
}
