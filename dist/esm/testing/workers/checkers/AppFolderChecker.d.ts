import type { ErrorMessage } from '../../../dt/index.js';
import type { FSManager, Worker } from '../../../std/index.js';
import type { AppTesterCtx } from '../../ctx.js';
interface Input {
    appPath: AppTesterCtx['appPath'];
}
interface Output {
    errors: ErrorMessage[];
}
export declare class AppFolderChecker implements Worker<Input, Promise<Output>> {
    private fsManager;
    private output;
    constructor(fsManager: FSManager);
    exec({ appPath }: Input): Promise<Output>;
    private makeSureSrcItemsAreAllowed;
}
export {};
