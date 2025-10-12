import type { UCInput } from './input.js';
import type { UCOPIBase } from './opi.js';
import type { UCOutputOrNothing } from './output.js';
import type { UC } from './UC.js';
export type UCTransporterOnPartialOutput<OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> = (output: UCOutputOrNothing<OPI0, OPI1>) => void;
export interface UCTransporterOpts<OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> {
    onPartialOutput?: UCTransporterOnPartialOutput<OPI0, OPI1> | undefined;
}
export interface UCTransporter {
    send<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined>(uc: UC<I, OPI0, OPI1>, opts?: UCTransporterOpts<OPI0, OPI1>): Promise<UCOutputOrNothing<OPI0, OPI1>>;
}
