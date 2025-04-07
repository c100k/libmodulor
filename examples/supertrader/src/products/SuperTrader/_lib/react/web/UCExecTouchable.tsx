import type { UCInput, UCOPIBase } from 'libmodulor';
import { type UCExecTouchableProps, useDIContext } from 'libmodulor/react';
import React, { type ReactElement } from 'react';

export function UCExecTouchable<
    I extends UCInput | undefined = undefined,
    OPI0 extends UCOPIBase | undefined = undefined,
    OPI1 extends UCOPIBase | undefined = undefined,
>({
    disabled,
    execState,
    onSubmit,
    uc,
}: UCExecTouchableProps<I, OPI0, OPI1>): ReactElement {
    const { wordingManager } = useDIContext();

    const label = wordingManager.ucISubmit(uc.def, execState);

    return (
        <button
            className="btn"
            disabled={disabled}
            onClick={onSubmit}
            type="button"
        >
            {label}
        </button>
    );
}
