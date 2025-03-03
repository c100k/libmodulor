import type { FileName, Slug } from '../../../../dt/index.js';
export declare const PACKAGE_JSON: (name: Slug) => string;
export declare function projectFiles(name: Slug): Map<FileName, string>;
