import type { Worker } from '../../std/index.js';
import type { UCInput } from '../input.js';
import type { UCOPIBase } from '../opi.js';
import { type ArgsRecord, UC } from '../UC.js';
type Input<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> = ArgsRecord<I, OPI0, OPI1>;
type Output<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> = UC<I, OPI0, OPI1>;
/**
 * Build a Use Case
 *
 * When initially implemented this, {@link I18nManager} was injected to provide the `languageCode` to the {@link UC}.
 *
 * But this dependency has been removed when introducing {@link WordingManager}. Let's keep it for now in case we need to inject something.
 */
export declare class UCBuilder implements Worker<Input, Output> {
    exec<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined>({ appManifest, auth, def }: Input<I, OPI0, OPI1>): Output<I, OPI0, OPI1>;
}
export {};
