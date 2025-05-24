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
            className="px-6 py-2 bg-blue-600 text-white rounded-2xl shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            disabled={disabled}
            onClick={onSubmit}
            type="button"
        >
            {label}
        </button>
    );
}
