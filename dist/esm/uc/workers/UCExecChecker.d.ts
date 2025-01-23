import { type interfaces } from 'inversify';
import type { ProductManifest } from '../../product/index.js';
import type { Configurable, SettingsManager, Worker } from '../../std/index.js';
import type { UC } from '../UC.js';
import type { UCDefLifecycle } from '../def.js';
import type { UCInput } from '../input.js';
import type { UCOPIBase } from '../opi.js';
import type { UCPolicy, UCPolicyOutput } from '../policy.js';
import type { UCSettings } from '../settings.js';
interface Input<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> {
    lifecycle: UCDefLifecycle;
    uc: UC<I, OPI0, OPI1>;
}
type Output = UCPolicyOutput;
type S = Pick<UCSettings, 'uc_disabled_use_cases'>;
export declare class UCExecChecker implements Configurable<S>, Worker<Input, Promise<Output>> {
    private productManifest;
    private settingsManager;
    private ucPolicyProvider;
    constructor(productManifest: ProductManifest, settingsManager: SettingsManager<S>, ucPolicyProvider: interfaces.Provider<UCPolicy>);
    s(): S;
    exec<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined>({ lifecycle, uc }: Input<I, OPI0, OPI1>): Promise<Output>;
}
export {};
