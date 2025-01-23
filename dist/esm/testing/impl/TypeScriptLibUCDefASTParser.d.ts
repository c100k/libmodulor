import type { FilePath } from '../../dt/index.js';
import type { FSManager, Logger } from '../../std/index.js';
import type { OnImport, OnInputType, OnMainStep, OnMetadata, OnOPIType, OnPolicy, OnVariable, UCDefASTParser } from '../UCDefASTParser.js';
import type { AppTesterOptsAllSet } from '../opts.js';
export declare class TypeScriptLibUCDefASTParser implements UCDefASTParser {
    private fsManager;
    private logger;
    private compilerOptions;
    private opts;
    private program;
    private typeChecker;
    constructor(fsManager: FSManager, logger: Logger);
    init(opts: AppTesterOptsAllSet, ucdsPaths: FilePath[]): Promise<void>;
    processFile(path: FilePath, onImport: OnImport, onVariable: OnVariable, onInputType: OnInputType, onOPIType: OnOPIType, onMainStep: OnMainStep, onPolicy: OnPolicy, onMetadata: OnMetadata): Promise<void>;
    transpile(): Promise<void>;
    private initCompilerOptions;
    private getTypeFields;
    private processConstDeclaration;
    private processConstType;
    private processLifecycleMain;
    private processLifecyclePolicy;
    private processMetadata;
    private processVariable;
}
