import type { UCDef, UCInput } from '../uc/index.js';
import type { AppTesterCtx } from './ctx.js';
import type { UCExecutorExecOutput, Input as UCExecutorInput } from './workers/UCExecutor.js';
export type AppTesterFlowExecOutput = UCExecutorExecOutput<any, any, any>[];
export type AppTesterFlowInputOverride<I extends UCInput> = (output: AppTesterFlowExecOutput) => I;
export type AppTesterFlow = Partial<Pick<UCExecutorInput, 'auth' | 'authName'>> & {
    name: string;
    setup?: (ctx: AppTesterCtx) => Promise<void>;
    steps: [
        UCDef<any, any, any>,
        AppTesterFlowInputOverride<any> | null
    ][];
};
