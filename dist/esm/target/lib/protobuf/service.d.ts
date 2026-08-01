import { Method, Service, type Type } from 'protobufjs';
import type { AppName } from '../../../app/index.js';
import { type UCDef, type UCHTTPContract, type UCInput, type UCOPIBase } from '../../../uc/index.js';
export interface ServiceTypes {
    input: Type;
    op0: Type | null;
    opi0: Type | null;
    op1: Type | null;
    opi1: Type | null;
    output: Type;
    outputParts: Type | null;
}
export declare function service(appName: AppName): Service;
export declare function serviceMethod<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined>(ucd: UCDef<I, OPI0, OPI1>, serviceTypes: ServiceTypes, contract: UCHTTPContract): Method;
export declare function serviceMethodStream<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined>(ucd: UCDef<I, OPI0, OPI1>): [boolean, boolean];
export declare function serviceTypes<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined>(ucd: UCDef<I, OPI0, OPI1>): ServiceTypes;
