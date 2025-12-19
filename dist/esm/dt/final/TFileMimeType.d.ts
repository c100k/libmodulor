import type { TName } from '../base/TBase.js';
import { TString } from '../base/TString.js';
export type FileMimeType = 'text/plain' | 'audio/aac' | 'application/x-abiword' | 'application/octet-stream' | 'video/x-msvideo' | 'application/vnd.amazon.ebook' | 'image/bmp' | 'application/x-bzip' | 'application/x-bzip2' | 'application/x-csh' | 'text/css' | 'text/csv' | 'application/msword' | 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' | 'application/vnd.ms-fontobject' | 'application/epub+zip' | 'image/gif' | 'text/html' | 'image/x-icon' | 'text/calendar' | 'application/java-archive' | 'image/jpeg' | 'image/jpg' | 'application/javascript' | 'application/json' | 'audio/midi' | 'video/mpeg' | 'application/vnd.apple.installer+xml' | 'application/vnd.oasis.opendocument.presentation' | 'application/vnd.oasis.opendocument.spreadsheet' | 'application/vnd.oasis.opendocument.text' | 'audio/ogg' | 'video/ogg' | 'application/ogg' | 'font/otf' | 'image/png' | 'application/pdf' | 'application/vnd.ms-powerpoint' | 'application/vnd.openxmlformats-officedocument.presentationml.presentation' | 'application/x-rar-compressed' | 'application/rtf' | 'application/x-sh' | 'image/svg+xml' | 'application/x-shockwave-flash' | 'application/x-tar' | 'image/tiff' | 'application/typescript' | 'font/ttf' | 'application/vnd.visio' | 'audio/x-wav' | 'audio/webm' | 'video/webm' | 'image/webp' | 'font/woff' | 'font/woff2' | 'application/xhtml+xml' | 'application/vnd.ms-excel' | 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' | 'application/xml' | 'application/vnd.mozilla.xul+xml' | 'application/zip' | 'video/3gpp audio/3gpp' | 'video/3gpp2 audio/3gpp2' | 'application/x-7z-compressed';
export interface TFileMimeTypeConstraints {
    allowed: FileMimeType[];
}
export declare class TFileMimeType extends TString<FileMimeType> {
    constructor(constraints?: TFileMimeTypeConstraints);
    tName(): TName;
    example(): FileMimeType;
}
