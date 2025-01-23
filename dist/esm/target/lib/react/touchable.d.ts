import type { ReactElement } from 'react';
import type { UCInput, UCOPIBase, UCWording } from '../../../uc/index.js';
import type { UCEntrypointCtx } from './entrypoint.js';
import type { UCPanelCtx, UCPanelOnSubmit } from './panel.js';
export type UCEntrypointTouchableProps<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> = UCEntrypointCtx<I, OPI0, OPI1> & {
    wording: UCWording;
};
export type RenderUCEntrypointTouchable<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> = (props: UCEntrypointTouchableProps<I, OPI0, OPI1>) => ReactElement;
export type UCExecTouchableProps<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> = UCPanelCtx<I, OPI0, OPI1> & {
    onSubmit: UCPanelOnSubmit;
};
export type RenderUCExecTouchable<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> = (props: UCExecTouchableProps<I, OPI0, OPI1>) => ReactElement;
