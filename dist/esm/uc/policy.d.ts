import type { Worker } from '../std/index.js';
import type { UC } from './UC.js';
import type { UCInput } from './input.js';
import type { UCOPIBase } from './opi.js';
export interface UCPolicyInput<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> {
    uc: UC<I, OPI0, OPI1>;
}
export interface UCPolicyOutput {
    allowed: boolean;
}
export interface UCPolicy<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> extends Worker<UCPolicyInput<I, OPI0, OPI1>, Promise<UCPolicyOutput>> {
    canBeExecutedPreAuth(): Promise<boolean>;
}
