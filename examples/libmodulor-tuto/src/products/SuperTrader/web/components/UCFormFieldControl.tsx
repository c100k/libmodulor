import {
    type DataType,
    type ErrorMessage,
    type HTMLInputType,
    type UCInputField,
    UCInputFieldChangeOperator,
    ucifRepeatability,
} from 'libmodulor';
import type {
    UCFormFieldControlOnChange,
    UCPanelState,
} from 'libmodulor/react';
import { htmlInputDef } from 'libmodulor/web';
import React, { type FormEventHandler, type ReactElement } from 'react';

export type Props<T extends DataType> = UCPanelState & {
    errMsg?: ErrorMessage | null;
    field: UCInputField<T>;
    onChange: UCFormFieldControlOnChange<T>;
};

const CHECKED_FIELD_TYPES: HTMLInputType[] = ['checkbox', 'radio'];
const FILE_FIELD_TYPES: HTMLInputType[] = ['file'];
const MULTIPLE_VALUES_SEPARATOR: string = ',';

export function UCFormFieldControl<T extends DataType>({
    errMsg = null,
    execState,
    field,
    onChange: onChangeBase,
}: Props<T>): ReactElement {
    const attrs = htmlInputDef(field, execState, errMsg);

    const onChange: FormEventHandler<HTMLInputElement | HTMLTextAreaElement> = (
        e,
    ) => {
        const target = e.currentTarget;
        const type = target.type as HTMLInputType;
        let value = target.value as T;

        if (CHECKED_FIELD_TYPES.includes(type) && 'checked' in target) {
            value = target.checked as T;
        } else if (FILE_FIELD_TYPES.includes(type) && 'files' in target) {
            value = target.files?.item(0) as T;
        }

        const [isRepeatable] = ucifRepeatability(field.def);
        if (isRepeatable && typeof value === 'string') {
            const valueArr = value
                .split(MULTIPLE_VALUES_SEPARATOR)
                .map((v) => v.trim());
            onChangeBase(field, UCInputFieldChangeOperator.SET, valueArr as T);
        } else {
            onChangeBase(field, UCInputFieldChangeOperator.SET, value);
        }
    };

    if (attrs.internal?.multiline) {
        return (
            <textarea
                {...attrs.spec}
                className="textarea"
                onChange={onChange}
            />
        );
    }

    return <input {...attrs.spec} className="input" onChange={onChange} />;
}
