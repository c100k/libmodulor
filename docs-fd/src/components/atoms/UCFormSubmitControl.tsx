import type { UCInput, UCOPIBase } from 'libmodulor';
import { type UCPanelCtx, useDIContext } from 'libmodulor/react';
import React, { type ReactElement } from 'react';

type Props<
    I extends UCInput | undefined = undefined,
    OPI0 extends UCOPIBase | undefined = undefined,
    OPI1 extends UCOPIBase | undefined = undefined,
> = UCPanelCtx<I, OPI0, OPI1>;

export function UCFormSubmitControl<
    I extends UCInput | undefined = undefined,
    OPI0 extends UCOPIBase | undefined = undefined,
    OPI1 extends UCOPIBase | undefined = undefined,
>({ execState, disabled, uc }: Props<I, OPI0, OPI1>): ReactElement {
    const { wordingManager } = useDIContext();

    return (
        <button
            className="px-6 py-1 bg-blue-600 text-white rounded shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            disabled={disabled}
            type="submit"
        >
            {wordingManager.ucISubmit(uc.def, execState)}
        </button>
    );
}
