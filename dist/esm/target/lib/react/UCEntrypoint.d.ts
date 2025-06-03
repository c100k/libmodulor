import type { ReactElement } from 'react';
import type { UCInput, UCOPIBase } from '../../../uc/index.js';
import type { UCEntrypointCtx } from './entrypoint.js';
import type { RenderUCEntrypointTouchable } from './touchable.js';
type Props<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> = UCEntrypointCtx<I, OPI0, OPI1> & {
    renderTouchable: RenderUCEntrypointTouchable<I, OPI0, OPI1>;
};
export declare function UCEntrypoint<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined>({ onPress, path, renderTouchable, uc }: Props<I, OPI0, OPI1>): ReactElement;
export {};
