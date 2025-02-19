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
/**
 * The policy defines the type(s) of user(s) who can perform the use case
 *
 * It corresponds more or less to RBAC (Resource Based Access Control).
 *
 * At this moment, for simplicity, ABAC (Attribute Based Access Control) must be done in the `main` of a use case.
 * For example, if you have to check that a user must be the owner of a resource.
 *
 * The main reason for this choice at this moment, is to avoid "double-fetching" in the `policy` and in `main`.
 *   1. Fetch the resource (e.g. by id) to check if the user is the owner => Accept
 *   2. Fetch the resource again to perform actions on it
 *
 * A good solution for this would be to pass the resources fetched from the `policy` to `main` but that is,
 * at least for the moment, out of scope.
 */
export interface UCPolicy<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> extends Worker<UCPolicyInput<I, OPI0, OPI1>, Promise<UCPolicyOutput>> {
    /**
     * Determines whether the policy check can be executed before checking the auth
     *
     * For example, for {@link NobodyUCPolicy}, we know that there is no need to check the auth,
     * as the policy will always return false. The same goes for {@link EverybodyUCPolicy} but
     * in the opposite way.
     */
    canBeExecutedPreAuth(): Promise<boolean>;
}
