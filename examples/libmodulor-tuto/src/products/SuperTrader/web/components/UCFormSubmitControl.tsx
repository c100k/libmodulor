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
        <button className="btn" disabled={disabled} type="submit">
            {execState === 'submitting' && (
                <span className="loading loading-spinner" />
            )}
            {wordingManager.ucISubmit(uc.def, execState)}
        </button>
    );
}
