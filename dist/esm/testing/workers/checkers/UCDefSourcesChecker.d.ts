import type { FSManager, Logger, Worker } from '../../../std/index.js';
import { type OutputItem, type UCDefASTParser } from '../../UCDefASTParser.js';
import type { AppTesterCtx } from '../../ctx.js';
export interface Input {
    ctx: AppTesterCtx;
}
export interface Output {
    items: OutputItem[];
}
export declare class UCDefSourcesChecker implements Worker<Input, Promise<Output>> {
    private fsManager;
    private logger;
    private ucDefASTParser;
    private opts;
    private output;
    constructor(fsManager: FSManager, logger: Logger, ucDefASTParser: UCDefASTParser);
    exec({ ctx }: Input): Promise<Output>;
    private checkConstName;
    private checkImport;
    private checkInputType;
    private checkMainStep;
    private checkMetadata;
    private checkOPIType;
    private checkPolicy;
    private processFiles;
    private ucdsAbsolutePaths;
}
