import type { ReactElement } from 'react';
import type { UCInput, UCOPIBase } from '../../uc/index.js';
import type { UCExecTouchableProps } from '../lib/react/touchable.js';
export declare function UCExecTouchable<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined>({ disabled, execState, onSubmit, uc, }: UCExecTouchableProps<I, OPI0, OPI1>): ReactElement;
