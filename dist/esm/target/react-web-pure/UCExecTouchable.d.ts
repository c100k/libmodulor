import { type ReactElement } from 'react';
import { type UCExecTouchableProps } from '../../index.react.js';
import type { UCInput, UCOPIBase } from '../../uc/index.js';
export declare function UCExecTouchable<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined>({ disabled, execState, onSubmit, uc, }: UCExecTouchableProps<I, OPI0, OPI1>): ReactElement;
