import type { Worker } from '../std/index.js';
import type { RegisterAbortFunc, StreamConfig } from '../utils/index.js';
import type { UCInput } from './input.js';
import type { UCOPIBase } from './opi.js';
import type { UCOutput, UCOutputOrNothing } from './output.js';
import type { UC } from './UC.js';
export type UCMainStream<OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> = StreamConfig<UCOutput<OPI0, OPI1>>;
export interface UCMainOpts<OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> {
    registerAbort?: RegisterAbortFunc | undefined;
    stream?: UCMainStream<OPI0, OPI1> | undefined;
}
export interface UCMainInput<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> {
    opts?: UCMainOpts<OPI0, OPI1>;
    uc: UC<I, OPI0, OPI1>;
}
export interface UCMain<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> extends Worker<UCMainInput<I, OPI0, OPI1>, Promise<UCOutputOrNothing<OPI0, OPI1>>> {
}
