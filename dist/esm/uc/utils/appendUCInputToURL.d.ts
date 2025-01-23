import type { UC } from '../UC.js';
import type { UCInput } from '../input.js';
import type { UCOPIBase } from '../opi.js';
export declare function appendUCInputToURL<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined>(uc: UC<I, OPI0, OPI1>, url: URL): void;
