import type { AnyUCDef, UCDef, UCInput, UCOPIBase } from '../uc/index.js';
import type { FirstNElements } from '../utils/index.js';
import type { AppTesterCtx } from './ctx.js';
import type { UCExecutorExecOutput, Input as UCExecutorInput } from './workers/UCExecutor.js';
export type AppTesterFlowExecOutput = UCExecutorExecOutput<any, any, any>[];
export type AppTesterFlowBase = Partial<Pick<UCExecutorInput, 'auth' | 'authName'>> & {
    name: string;
    setup?: (ctx: AppTesterCtx) => Promise<void>;
};
export type AppTesterFlowStepInput<S> = S extends UCDef<infer I, any, any> ? Partial<I> : never;
export type AppTesterFlowStepOutput<S> = S extends UCDef<infer I, infer OPI0, infer OPI1> ? UCExecutorExecOutput<I, OPI0, OPI1> : never;
export type AppTesterFlowStepInputOverrideData<Steps extends readonly AnyUCDef[]> = {
    [K in keyof Steps]: AppTesterFlowStepOutput<Steps[K]>;
};
export type AppTesterFlowStepFirst<Steps extends readonly AnyUCDef[], K extends keyof Steps> = [Steps[K]];
export type AppTesterFlowStepSimple<Steps extends readonly AnyUCDef[], K extends keyof Steps> = [Steps[K]];
export type AppTesterFlowStepWithInputOverride<Steps extends readonly AnyUCDef[], K extends keyof Steps> = [
    Steps[K],
    (data: AppTesterFlowStepInputOverrideData<FirstNElements<Steps, K extends `${infer N extends number}` ? N : never>>) => AppTesterFlowStepInput<Steps[K]>
];
export type AppTesterFlowSteps<Steps extends readonly AnyUCDef[]> = {
    [K in keyof Steps]: K extends `${number}` ? K extends '0' ? AppTesterFlowStepFirst<Steps, K> : AppTesterFlowStepSimple<Steps, K> | AppTesterFlowStepWithInputOverride<Steps, K> : never;
};
export type AppTesterFlow<Steps extends readonly AnyUCDef[]> = AppTesterFlowBase & {
    steps: AppTesterFlowSteps<Steps>;
};
export type AnyAppTesterFlow = AppTesterFlowBase & {
    steps: readonly unknown[];
};
export declare function appTesterFlow<const Steps extends readonly AnyUCDef[]>(args: AppTesterFlow<Steps>): AppTesterFlow<Steps>;
export declare function appTesterFlowRead00<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined>(output: UCExecutorExecOutput<I, OPI0, OPI1>): OPI0;
