import type { Class } from '../utils/index.js';
import type { UCExecMode } from './exec.js';
import type { UCInit } from './init.js';
import type { UCInput } from './input.js';
import type { UCMain } from './main.js';
import type { UCOPIBase } from './opi.js';
import type { UCPolicy } from './policy.js';
export interface UCServerDef<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> {
    /**
     * Define how the use case can be executed
     *
     * When set to {@link UCExecMode.AUTO}, the use case is not mounted on the target (i.e. no endpoint on a server).
     *
     * @defaultValue {@link UCExecMode.USER}
     */
    execMode?: UCExecMode;
    /**
     * Routine to run when mounting the use case in a {@link ServerManager}
     */
    init?: Class<UCInit>;
    main: Class<UCMain<I, OPI0, OPI1>>;
    policy: Class<UCPolicy<I, OPI0, OPI1>>;
}
