import type { UCInput, UCOPIBase } from 'libmodulor';
import type { UCExecTouchableProps } from 'libmodulor/react';
import { UCExecTouchable as UCExecTouchableBase } from 'libmodulor/react-web-pure';
import React, { type ReactElement } from 'react';

export function UCExecTouchable<
    I extends UCInput | undefined = undefined,
    OPI0 extends UCOPIBase | undefined = undefined,
    OPI1 extends UCOPIBase | undefined = undefined,
>(props: UCExecTouchableProps<I, OPI0, OPI1>): ReactElement {
    return <UCExecTouchableBase {...props} className="btn" />;
}
