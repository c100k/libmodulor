import type { AppManifest, AppUCsLoaderOutput } from '../../app/index.js';
import type { Logger, Worker } from '../../std/index.js';
import { type AnyUCDef, UCBuilder } from '../../uc/index.js';
import type { ProductManifest } from '../manifest.js';
export interface Input {
    defs: Map<AppManifest, AnyUCDef[]>;
}
export type Output = AppUCsLoaderOutput;
export declare class SyncProductUCsLoader implements Worker<Input, Output> {
    private logger;
    private productManifest;
    private ucBuilder;
    constructor(logger: Logger, productManifest: ProductManifest, ucBuilder: UCBuilder);
    exec({ defs }: Input): AppUCsLoaderOutput;
}
