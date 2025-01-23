import type { TName } from '../base/TBase.js';
import { TString, type TStringConstraints } from '../base/TString.js';
type ImageExtension = 'gif' | 'heic' | 'jpg' | 'png';
type VideoExtension = 'mov' | 'mp4';
type XMLExtension = 'gpx' | 'xml';
export type FileExtension = ImageExtension | VideoExtension | XMLExtension;
export interface TFileExtensionConstraints extends TStringConstraints {
    allowed: FileExtension[];
}
export declare class TFileExtension extends TString<FileExtension> {
    constructor(constraints?: TFileExtensionConstraints);
    tName(): TName;
    example(): FileExtension;
}
export {};
