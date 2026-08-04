import type { FileMetadataManager, FileMetadataManagerInfo } from '../FileMetadataManager.js';
import type { ShellCommandExecutor } from '../ShellCommandExecutor.js';
export declare class NodeFileBinFileMetadataManager implements FileMetadataManager {
    private shellCommandExecutor;
    constructor(shellCommandExecutor: ShellCommandExecutor);
    info(file: File): Promise<FileMetadataManagerInfo>;
    private call;
}
