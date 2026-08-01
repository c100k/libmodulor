import { Type } from 'protobufjs';
import { type UCName, type UCOPIBase, type UCOutputPartDef } from '../../../uc/index.js';
export declare function ucOPIType<OPI extends UCOPIBase>(name: string, part: UCOutputPartDef<OPI>): Type;
export declare function ucOutputPartType(name: string, opi: Type, pagination: Type): Type;
export declare function ucOutputPartsType(name: UCName, op0: Type): Type;
export declare function ucOutputType(name: UCName, outputParts: Type): Type;
export declare function ucOutputPartPaginationType(): Type;
