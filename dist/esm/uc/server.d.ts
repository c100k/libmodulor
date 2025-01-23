import type { Class } from '../utils/index.js';
import type { UCExecMode } from './exec.js';
import type { UCInit } from './init.js';
import type { UCInput } from './input.js';
import type { UCMain } from './main.js';
import type { UCOPIBase } from './opi.js';
import type { UCPolicy } from './policy.js';
export interface UCServerDef<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> {
    execMode?: UCExecMode;
    init?: Class<UCInit>;
    main: Class<UCMain<I, OPI0, OPI1>>;
    policy: Class<UCPolicy<I, OPI0, OPI1>>;
}
