import type { ErrorMessage } from '../../../dt/index.js';
import type { Worker } from '../../../std/index.js';
import type { UCDef } from '../../../uc/index.js';
import type { AppTesterUCDRef } from '../../ctx.js';
export interface Input {
    ucdRef: AppTesterUCDRef;
}
export interface Output {
    errors: ErrorMessage[];
    ucd: UCDef | null;
}
export declare class UCDefChecker implements Worker<Input, Promise<Output>> {
    private output;
    constructor();
    exec({ ucdRef }: Input): Promise<Output>;
}
