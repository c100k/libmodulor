import type { AppTesterConfigurator, AppTesterConfiguratorAuthSettersConfig, AppTesterConfiguratorInputFillers, AppTesterConfiguratorSideEffects, AppTesterConfiguratorSpecificAssertions } from '../AppTesterConfigurator.js';
import type { AppTesterCtx } from '../ctx.js';
import type { AnyAppTesterFlow } from '../flow.js';
export declare class NodeAppTesterConfigurator implements AppTesterConfigurator {
    authSettersConfig(): Promise<AppTesterConfiguratorAuthSettersConfig | undefined>;
    bindImplementations(ctx: AppTesterCtx): Promise<void>;
    clearExecution(ctx: AppTesterCtx): Promise<void>;
    flows(): Promise<AnyAppTesterFlow[]>;
    inputFillers(): Promise<AppTesterConfiguratorInputFillers | undefined>;
    opts(): Promise<AppTesterCtx['opts']>;
    seed(_ctx: AppTesterCtx): Promise<void>;
    sideEffects(_ctx: AppTesterCtx): Promise<AppTesterConfiguratorSideEffects | undefined>;
    specificAssertions(): Promise<AppTesterConfiguratorSpecificAssertions | undefined>;
    updateSettings<S>(ctx: AppTesterCtx, settings: S): Promise<void>;
}
