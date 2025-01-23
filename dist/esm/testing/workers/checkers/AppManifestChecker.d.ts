import type { AppManifest } from '../../../app/index.js';
import type { ErrorMessage } from '../../../dt/index.js';
import type { Worker } from '../../../std/index.js';
import type { AppTesterCtx } from '../../ctx.js';
export interface Input {
    appManifest: AppManifest;
    ucdRefs: AppTesterCtx['ucdRefs'];
}
export interface Output {
    errors: ErrorMessage[];
}
export declare class AppManifestChecker implements Worker<Input, Promise<Output>> {
    private output;
    constructor();
    exec({ appManifest, ucdRefs }: Input): Promise<Output>;
    private makeSureUCsAreConsistent;
}
