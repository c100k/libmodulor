import { type ReactElement } from 'react';
import type { UCInput, UCOPIBase } from '../../uc/index.js';
import type { UCPanelCtx } from '../lib/react/panel.js';
type Props<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> = UCPanelCtx<I, OPI0, OPI1>;
export declare function UCFormSubmitControl<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined>({ execState, disabled, uc }: Props<I, OPI0, OPI1>): ReactElement;
export {};
