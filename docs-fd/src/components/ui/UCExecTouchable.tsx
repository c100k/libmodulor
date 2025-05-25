import type { UCInput, UCOPIBase } from 'libmodulor';
import type { UCExecTouchableProps } from 'libmodulor/react';
import { UCExecTouchable as UCExecTouchableBase } from 'libmodulor/react-web-pure';
import React, { type ReactElement } from 'react';

export function UCExecTouchable<
    I extends UCInput | undefined = undefined,
    OPI0 extends UCOPIBase | undefined = undefined,
    OPI1 extends UCOPIBase | undefined = undefined,
>(props: UCExecTouchableProps<I, OPI0, OPI1>): ReactElement {
    return (
        <UCExecTouchableBase
            {...props}
            className="px-6 py-1 bg-gray-900 text-white rounded shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
    );
}
