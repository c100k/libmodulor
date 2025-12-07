import type { FileName } from '../../dt/index.js';
export type InputCode = string;
export type OutputCode = string;
export type StrippableFileExtension = 'js' | 'ts';
export declare function isFileEligible(fileName: FileName | undefined, exts: StrippableFileExtension[]): boolean;
export declare function assertTransformedCorrectly(transformed: OutputCode, fileName: FileName | undefined): void;
