import { type DirPath, type FileName, type FreeTextShort, type Slug } from '../../../../dt/index.js';
import { type UCDef, type UCInput, type UCInputFieldValue } from '../../../../uc/index.js';
export interface CreateProjectInput extends UCInput {
    initialCommit: UCInputFieldValue<FreeTextShort>;
    outPath: UCInputFieldValue<DirPath>;
    pkgManagerBin: UCInputFieldValue<FileName>;
    projectName: UCInputFieldValue<Slug>;
    scmBin: UCInputFieldValue<FileName>;
    verbose: UCInputFieldValue<boolean>;
}
export declare const CreateProjectUCD: UCDef<CreateProjectInput>;
