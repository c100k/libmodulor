import type { UCInput, UCOPIBase } from 'libmodulor';
import type { UCFormProps } from 'libmodulor/react';
import { UCFormSubmitControl } from 'libmodulor/react-web-pure';
import React, { type ReactElement, type FormEventHandler, useRef } from 'react';

import { UCFormField } from './UCFormField';

export function UCForm<
    I extends UCInput | undefined = undefined,
    OPI0 extends UCOPIBase | undefined = undefined,
    OPI1 extends UCOPIBase | undefined = undefined,
>({
    clearAfterExec,
    disabled,
    execState,
    onChange,
    onSubmit: onSubmitBase,
    uc,
}: UCFormProps<I, OPI0, OPI1>): ReactElement {
    const formRef = useRef<HTMLFormElement>(null);

    const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        const succeeded = await onSubmitBase();

        if (succeeded && clearAfterExec) {
            formRef.current?.reset();
        }
    };

    return (
        <form className="flex flex-col gap-5" onSubmit={onSubmit} ref={formRef}>
            {uc.inputFieldsForForm().map((f) => (
                <UCFormField
                    key={f.key}
                    disabled={disabled}
                    execState={execState}
                    f={f}
                    onChange={onChange}
                />
            ))}

            <UCFormSubmitControl
                className="px-6 py-1 bg-gray-900 text-white rounded shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                execState={execState}
                disabled={disabled}
                uc={uc}
            />
        </form>
    );
}
