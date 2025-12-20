import type { FileMimeType, FileName, FilePath } from '../dt/index.js';
export interface BlobLike {
    name: FileName;
    type: FileMimeType;
    uri: FilePath;
}
export type FormDataBuilderVal = BlobLike | string;
export interface FormDataBuilder {
    append(fd: FormData, key: string, val: FormDataBuilderVal): Promise<void>;
}
