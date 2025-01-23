import type { TName } from '../base/TBase.js';
import { TString } from '../base/TString.js';
export type HTTPMethod = 'CONNECT' | 'DELETE' | 'GET' | 'HEAD' | 'OPTIONS' | 'PATCH' | 'POST' | 'PUT' | 'TRACE';
export declare class THTTPMethod extends TString<HTTPMethod> {
    static readonly OPTIONS: HTTPMethod[];
    constructor();
    tName(): TName;
    example(): HTTPMethod;
}
