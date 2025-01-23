import type { UCInput } from '../../input.js';
import type { UCMain, UCMainInput } from '../../main.js';
import type { UCOPIBase } from '../../opi.js';
export declare class IdleClientMain<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> implements UCMain<I, OPI0, OPI1> {
    exec(_props: UCMainInput<I, OPI0, OPI1>): Promise<void>;
}
