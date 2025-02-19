import type { CryptoManagerHash } from '../std/index.js';
import type { UCInput, UCName, UCOPIBase } from '../uc/index.js';
import type { AppTesterCtx } from './ctx.js';
import type { AppTesterFlow } from './flow.js';
import type { DefaultUCAuthSetter, UCAuthSetterSet } from './uc-auth.js';
import type { CustomUCInputFiller, UCInputFillerSet } from './uc-input.js';
import type { UCExecutorAssertion } from './workers/UCExecutor.js';
export type AppTesterConfiguratorAuthSettersConfig = {
    /**
     * Specific auth setters to add to the default ones
     */
    add?: UCAuthSetterSet;
    /**
     * Default auth setters to exclude
     *
     * For instance, if your app does not care about auth (e.g. only client side app), you can safely exclude everything except {@link ANONYMOUS}
     */
    exclude?: Set<DefaultUCAuthSetter>;
};
export type AppTesterConfiguratorInputFillers<I extends UCInput = any, OPI0 extends UCOPIBase = any, OPI1 extends UCOPIBase = any> = Map<UCName, UCInputFillerSet<CustomUCInputFiller, I, OPI0, OPI1>>;
export type AppTesterConfiguratorSideEffects = Map<string, any>;
export type AppTesterConfiguratorSideEffectsSerialized = [string, any][];
export type AppTesterConfiguratorSpecificAssertions<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> = Map<CryptoManagerHash, UCExecutorAssertion<I, OPI0, OPI1>>;
/**
 * Configure the tester for a specific app
 *
 * @defaultValue See {@link SimpleAppTesterConfigurator}
 */
export interface AppTesterConfigurator {
    /**
     * Auth setters config to add some or exclude default ones
     */
    authSettersConfig(): Promise<AppTesterConfiguratorAuthSettersConfig | undefined>;
    /**
     * Override the implementations needed by the use cases, in `ctx.container`
     *
     * @param ctx
     */
    bindImplementations(ctx: AppTesterCtx): Promise<void>;
    /**
     * Clear what needs to be cleared after a use case execution
     *
     * For instance, this includes the data store, some fake queue processor checked in side effects, etc.
     *
     * @param ctx
     */
    clearExecution(ctx: AppTesterCtx): Promise<void>;
    /**
     * Define specific flows to test multiple use cases sequentially
     *
     * For example : SignUp > SignIn > SignOut > ResetPassword, etc.
     */
    flows(): Promise<AppTesterFlow[]>;
    /**
     * Define specific input fillers, per use case, in addition to the default ones
     *
     * @see defaultInputFillers
     */
    inputFillers(): Promise<AppTesterConfiguratorInputFillers | undefined>;
    /**
     * Override the `ctx.opts()`, in case the app has some specificities
     */
    opts(): Promise<AppTesterCtx['opts']>;
    /**
     * Seed some data in any data store needed by the use cases
     *
     * @param ctx
     */
    seed(ctx: AppTesterCtx): Promise<void>;
    /**
     * Register the side effects that need to be tracked
     *
     * For instance, this is where you register {@link FakeEmailManager.entries} to check the emails sent by use cases.
     *
     * Or it can also be the entries of some fake job processor to check the jobs dispatched by use cases.
     *
     * Note that it works only if there are no `specificAssertions` for the given use case.
     *
     * Otherwise, you need to assert side effects manually.
     *
     * @param ctx
     */
    sideEffects(ctx: AppTesterCtx): Promise<AppTesterConfiguratorSideEffects | undefined>;
    /**
     * Define specific assertions for a specific use case
     *
     * Otherwise, it matches the snapshot.
     *
     * For instance, you can use this if a specific use case performs some random processing (e.g. generating random data).
     *
     * Generally speaking, it's always better to have deterministic tests, so it's usually better to bind deterministic implementations in the tests.
     */
    specificAssertions(): Promise<AppTesterConfiguratorSpecificAssertions | undefined>;
}
