import type { TName } from '../base/TBase.js';
import { TString } from '../base/TString.js';
export type HTTPContentType = 'application/json' | 'application/x-www-form-urlencoded' | 'multipart/form-data' | 'text/html' | 'text/plain';
export declare class THTTPContentType extends TString<HTTPContentType> {
    static readonly OPTIONS: HTTPContentType[];
    constructor();
    tName(): TName;
    example(): HTTPContentType;
}
