import type { Worker } from '../../std/index.js';
import { type ArgsRecord, UC } from '../UC.js';
import type { UCInput } from '../input.js';
import type { UCOPIBase } from '../opi.js';
type Input<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> = ArgsRecord<I, OPI0, OPI1>;
type Output<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> = UC<I, OPI0, OPI1>;
export declare class UCBuilder implements Worker<Input, Output> {
    exec<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined>({ appManifest, auth, def }: Input<I, OPI0, OPI1>): Output<I, OPI0, OPI1>;
}
export {};
