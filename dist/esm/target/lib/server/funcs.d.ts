import { type UCDef, type UCInput, type UCOPIBase } from '../../../uc/index.js';
export type ShouldNotMountReason = string;
export declare function shouldMountUC<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined>(ucd: UCDef<I, OPI0, OPI1>): ShouldNotMountReason | null;
