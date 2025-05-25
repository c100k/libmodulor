import { type DataType, ucifId } from 'libmodulor';
import { type UCFormFieldProps, useDIContext } from 'libmodulor/react';
import { UCFormFieldControl } from 'libmodulor/react-web-pure';
import React, { type ReactElement } from 'react';

export function UCFormField<T extends DataType>({
    disabled,
    execState,
    f,
    onChange,
}: UCFormFieldProps<T>): ReactElement {
    const { wordingManager } = useDIContext();

    const { label } = wordingManager.ucif(f);

    return (
        <div className="flex flex-col gap-1">
            <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor={ucifId(f.key)}
            >
                {label}
            </label>
            <UCFormFieldControl
                className="px-6 py-1 bg-gray-900 text-white rounded shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                disabled={disabled}
                execState={execState}
                f={f}
                onChange={onChange}
            />
        </div>
    );
}
