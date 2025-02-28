import { type DirPath, type Slug } from '../../../../dt/index.js';
import type { FSManager, Logger, ShellCommandExecutor } from '../../../../std/index.js';
import { type UCDef, type UCInput, type UCInputFieldValue, type UCMain, type UCMainInput } from '../../../../uc/index.js';
export interface CreateProjectInput extends UCInput {
    outPath: UCInputFieldValue<DirPath>;
    projectName: UCInputFieldValue<Slug>;
}
export declare class CreateProjectClientMain implements UCMain<CreateProjectInput> {
    private fsManager;
    private logger;
    private shellCommandExecutor;
    constructor(fsManager: FSManager, logger: Logger, shellCommandExecutor: ShellCommandExecutor);
    exec({ uc }: UCMainInput<CreateProjectInput>): Promise<void>;
}
export declare const CreateProjectUCD: UCDef<CreateProjectInput>;
