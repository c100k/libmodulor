import type { UCInput } from '../input.js';
import type { UCOPIBase } from '../opi.js';
import type { UCPolicy, UCPolicyInput, UCPolicyOutput } from '../policy.js';
export declare class EverybodyUCPolicy<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> implements UCPolicy<I, OPI0, OPI1> {
    canBeExecutedPreAuth(): Promise<boolean>;
    exec(_input: UCPolicyInput<I, OPI0, OPI1>): Promise<UCPolicyOutput>;
}
