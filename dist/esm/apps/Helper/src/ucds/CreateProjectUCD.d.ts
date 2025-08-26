import { type DirPath, type FileName, type FreeTextShort, type Slug } from '../../../../dt/index.js';
import type { FSManager, Logger, ShellCommandExecutor } from '../../../../std/index.js';
import { type UCDef, type UCInput, type UCInputFieldValue, type UCMain, type UCMainInput } from '../../../../uc/index.js';
export interface CreateProjectInput extends UCInput {
    initialCommit: UCInputFieldValue<FreeTextShort>;
    outPath: UCInputFieldValue<DirPath>;
    pkgManagerBin: UCInputFieldValue<FileName>;
    projectName: UCInputFieldValue<Slug>;
    scmBin: UCInputFieldValue<FileName>;
    verbose: UCInputFieldValue<boolean>;
}
export declare class CreateProjectClientMain implements UCMain<CreateProjectInput> {
    private fsManager;
    private logger;
    private shellCommandExecutor;
    constructor(fsManager: FSManager, logger: Logger, shellCommandExecutor: ShellCommandExecutor);
    exec({ uc }: UCMainInput<CreateProjectInput>): Promise<void>;
    private assertBinPresence;
    private commit;
    private createConfigFiles;
    private createDirs;
    private createRootDir;
    private initRepository;
    private installDeps;
    private runDevCmds;
}
export declare const CreateProjectUCD: UCDef<CreateProjectInput>;
