import { type DirPath, type FileName, type FreeTextShort, type Slug } from '../../../../dt/index.js';
import { type UCDef, type UCInput } from '../../../../uc/index.js';
export interface CreateProjectInput extends UCInput {
    initialCommit: FreeTextShort;
    outPath: DirPath;
    pkgManagerBin: FileName;
    projectName: Slug;
    scmBin: FileName;
    verbose: boolean;
}
export declare const CreateProjectUCD: UCDef<CreateProjectInput>;
