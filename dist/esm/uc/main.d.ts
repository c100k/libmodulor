import type { Worker } from '../std/index.js';
import type { UCInput } from './input.js';
import type { UCOPIBase } from './opi.js';
import type { UCOutputOrNothing } from './output.js';
import type { UCTransporterOnPartialOutput } from './transporter.js';
import type { UC } from './UC.js';
export interface UCMainInput<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> {
    onPartialOutput?: UCTransporterOnPartialOutput<OPI0, OPI1> | undefined;
    uc: UC<I, OPI0, OPI1>;
}
export interface UCMain<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> extends Worker<UCMainInput<I, OPI0, OPI1>, Promise<UCOutputOrNothing<OPI0, OPI1>>> {
}
