import type { ErrorMessage, FilePath } from '../dt/index.js';
import type { UCDefLifecycle, UCFieldKey, UCMetadata, UCOutputPartIdx } from '../uc/index.js';
import type { AppTesterOptsAllSet } from './opts.js';
export interface OutputItemField<T extends string = string> {
    err: ErrorMessage | null;
    value: T;
}
export interface OutputItem {
    constName: OutputItemField | null;
    externalImports: OutputItemField[] | null;
    filePath: OutputItemField | null;
    internalImports: OutputItemField[] | null;
    ioI: OutputItemField | null;
    ioIFields: OutputItemField[] | null;
    ioOPI0: OutputItemField | null;
    ioOPI0Fields: OutputItemField[] | null;
    ioOPI1: OutputItemField | null;
    ioOPI1Fields: OutputItemField[] | null;
    lifecycleClientPolicy: OutputItemField | null;
    lifecycleClientSteps: OutputItemField[] | null;
    lifecycleServerPolicy: OutputItemField | null;
    lifecycleServerSteps: OutputItemField[] | null;
    metadataAction: OutputItemField | null;
    metadataBeta: OutputItemField | null;
    metadataIcon: OutputItemField | null;
    metadataName: OutputItemField | null;
    metadataNew: OutputItemField | null;
    metadataSensitive: OutputItemField | null;
}
export declare const OUTPUT_ITEM_FIELDS: (keyof OutputItem)[];
export type OnImport = (name: string) => void;
export type OnInputType = (name: string, fields: OutputItemField[]) => void;
export type OnMainStep = (lifecycle: UCDefLifecycle, step: string) => void;
export type OnMetadata = (metadata: UCMetadata) => void;
export type OnOPIType = (name: string, fields: OutputItemField[], idx: UCOutputPartIdx) => void;
export type OnPolicy = (lifecycle: UCDefLifecycle, name: string) => void;
export type OnVariable = (name: string) => void;
export interface UCDefASTParser {
    init(opts: AppTesterOptsAllSet, ucdsPaths: FilePath[]): Promise<void>;
    processFile(path: FilePath, onImport: OnImport, onVariable: OnVariable, onInputType: OnInputType, onOPIType: OnOPIType, onMainStep: OnMainStep, onPolicy: OnPolicy, onMetadata: OnMetadata): Promise<void>;
    transpile(): Promise<void>;
}
export declare function initOutputItem(): OutputItem;
export declare function ioFieldName(field: OutputItemField): UCFieldKey | null;
