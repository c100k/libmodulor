import type { ErrorMessage } from '../../../dt/index.js';
import type { FSManager, Worker } from '../../../std/index.js';
import type { AppTesterCtx } from '../../ctx.js';
export interface Input {
    appPath: AppTesterCtx['appPath'];
}
export interface Output {
    errors: ErrorMessage[];
}
export declare class AppIndexChecker implements Worker<Input, Promise<Output>> {
    private fsManager;
    private output;
    constructor(fsManager: FSManager);
    exec({ appPath }: Input): Promise<Output>;
    private makeSureExposesNecessary;
}
