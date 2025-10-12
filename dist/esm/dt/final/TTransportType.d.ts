import type { TName } from '../base/TBase.js';
import { TString } from '../base/TString.js';
export type TransportType = 'standard' | 'stream';
export declare class TTransportType extends TString<TransportType, 'TransportType'> {
    constructor();
    tName(): TName;
    example(): TransportType;
}
