import type { FilePath } from '../../dt/index.js';
export type SrcImporter<T extends object = object> = (path: FilePath) => Promise<T>;
