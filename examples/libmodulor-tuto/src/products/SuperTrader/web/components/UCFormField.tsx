import React, { useState, type ReactElement } from 'react';

import { type DataType, type ErrorMessage, ucifId } from 'libmodulor';
import {
    type UCFormFieldControlOnChange,
    useDIContext,
} from 'libmodulor/react';
import {
    type Props as FormFieldControlProps,
    UCFormFieldControl,
} from './UCFormFieldControl.js';

const ELEMENTS = ['control', 'desc', 'err', 'label'] as const;
type Element = (typeof ELEMENTS)[number];

type Props<T extends DataType> = FormFieldControlProps<T> & {
    only?: Element[];
};

export function UCFormField<T extends DataType>({
    disabled,
    execState,
    field,
    onChange: onChangeBase,
}: Props<T>): ReactElement {
    const { i18nManager, wordingManager } = useDIContext();

    const { type } = field.def;
    const { label } = wordingManager.ucif(field);

    const [errMsg, setErrMsg] = useState<ErrorMessage | null>(null);

    const onChange: UCFormFieldControlOnChange<T> = (f, op, v) => {
        setErrMsg(null);

        const vArr = Array.isArray(v) ? v : [v];
        for (const vv of vArr) {
            const validation = type.assign(vv).validate();
            const violation = validation.get();
            if (violation) {
                const [key, expected] = violation;
                setErrMsg(i18nManager.t(key, { vars: { expected } }));
                break;
            }
        }

        onChangeBase(f, op, v);
    };

    return (
        <>
            <label className="floating-label" htmlFor={ucifId(field.key)}>
                <span>{label}</span>
                <UCFormFieldControl
                    disabled={disabled}
                    execState={execState}
                    field={field}
                    onChange={onChange}
                />
            </label>
            {errMsg && <p>{errMsg}</p>}
        </>
    );
}
