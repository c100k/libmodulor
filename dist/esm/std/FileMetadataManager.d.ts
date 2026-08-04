import type { FileExtension, FileMimeType } from '../dt/index.js';
export interface FileMetadataManagerInfo {
    ext: FileExtension | null;
    mimeType: FileMimeType;
}
export interface FileMetadataManager {
    info(file: File): Promise<FileMetadataManagerInfo>;
}
