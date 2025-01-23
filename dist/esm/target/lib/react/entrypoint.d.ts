import type { URLPath } from '../../../dt/index.js';
import type { UC, UCInput, UCOPIBase } from '../../../uc/index.js';
export interface UCEntrypointCtx<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> {
    path?: URLPath | undefined;
    uc: UC<I, OPI0, OPI1>;
}
