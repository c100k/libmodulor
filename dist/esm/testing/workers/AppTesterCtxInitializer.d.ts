import type { FilePath } from '../../dt/index.js';
import { type FSManager, type Worker } from '../../std/index.js';
import type { UCDefSource } from '../../uc/index.js';
import { type SrcImporter } from '../../utils/index.js';
import type { AppTesterCtx } from '../ctx.js';
export interface Input {
    appPath: FilePath;
    srcImporter: SrcImporter<UCDefSource>;
}
export interface Output {
    ctx: AppTesterCtx;
}
export declare class AppTesterCtxInitializer implements Worker<Input, Promise<Output>> {
    private fsManager;
    constructor(fsManager: FSManager);
    exec({ appPath, srcImporter }: Input): Promise<Output>;
}
