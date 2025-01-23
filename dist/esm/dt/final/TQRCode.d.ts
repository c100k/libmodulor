import type { TName } from '../base/TBase.js';
import { TString, type TStringConstraints } from '../base/TString.js';
export type QRCode = `data:image/png;base64,${string}`;
export declare class TQRCode extends TString<QRCode> {
    static readonly FORMAT: RegExp;
    constructor(constraints?: TStringConstraints);
    tName(): TName;
    example(): QRCode;
}
