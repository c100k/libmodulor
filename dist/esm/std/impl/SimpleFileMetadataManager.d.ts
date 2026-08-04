import type { FileExtension } from '../../dt/index.js';
import type { FileMetadataManager, FileMetadataManagerInfo } from '../FileMetadataManager.js';
export declare class SimpleFileMetadataManager implements FileMetadataManager {
    info(file: File): Promise<FileMetadataManagerInfo>;
    ext(file: File): FileExtension;
}
