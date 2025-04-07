import type { UCInput, UCOPIBase } from 'libmodulor';
import type { UCFormProps } from 'libmodulor/react';
import React, { type ReactElement, type FormEventHandler, useRef } from 'react';

import { UCFormField } from './UCFormField.js';
import { UCFormSubmitControl } from './UCFormSubmitControl.js';

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
        <form className="flex gap-2" onSubmit={onSubmit} ref={formRef}>
            {uc.inputFieldsForForm().map((f) => (
                <div key={f.key}>
                    <UCFormField
                        disabled={disabled}
                        execState={execState}
                        field={f}
                        onChange={onChange}
                    />
                </div>
            ))}

            <UCFormSubmitControl
                execState={execState}
                disabled={disabled}
                uc={uc}
            />
        </form>
    );
}
