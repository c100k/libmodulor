import type { CryptoManagerHash } from '../std/index.js';
import type { UCInput, UCName, UCOPIBase } from '../uc/index.js';
import type { AppTesterCtx } from './ctx.js';
import type { AppTesterFlow } from './flow.js';
import type { DefaultUCAuthSetter, UCAuthSetterSet } from './uc-auth.js';
import type { CustomUCInputFiller, UCInputFillerSet } from './uc-input.js';
import type { UCExecutorAssertion } from './workers/UCExecutor.js';
export type AppTesterConfiguratorAuthSettersConfig = {
    add?: UCAuthSetterSet;
    exclude?: Set<DefaultUCAuthSetter>;
};
export type AppTesterConfiguratorInputFillers<I extends UCInput = any, OPI0 extends UCOPIBase = any, OPI1 extends UCOPIBase = any> = Map<UCName, UCInputFillerSet<CustomUCInputFiller, I, OPI0, OPI1>>;
export type AppTesterConfiguratorSideEffects = Map<string, any>;
export type AppTesterConfiguratorSideEffectsSerialized = [string, any][];
export type AppTesterConfiguratorSpecificAssertions<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> = Map<CryptoManagerHash, UCExecutorAssertion<I, OPI0, OPI1>>;
export interface AppTesterConfigurator {
    authSettersConfig(): Promise<AppTesterConfiguratorAuthSettersConfig | undefined>;
    bindImplementations(ctx: AppTesterCtx): Promise<void>;
    clearExecution(ctx: AppTesterCtx): Promise<void>;
    flows(): Promise<AppTesterFlow[]>;
    inputFillers(): Promise<AppTesterConfiguratorInputFillers | undefined>;
    opts(): Promise<AppTesterCtx['opts']>;
    seed(ctx: AppTesterCtx): Promise<void>;
    sideEffects(ctx: AppTesterCtx): Promise<AppTesterConfiguratorSideEffects | undefined>;
    specificAssertions(): Promise<AppTesterConfiguratorSpecificAssertions | undefined>;
}
