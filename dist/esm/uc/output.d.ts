import type { UCOPIBase } from './opi.js';
import type { UCOutputPart, UCOutputPartDef } from './output-part.js';
import type { UCOutputSideEffect } from './side-effect.js';
export type UCOutputPartIdx = 0 | 1;
export type UCOutputPartKey<OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> = keyof UCOutput<OPI0, OPI1>['parts'];
export interface UCOutput<OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> {
    parts: {
        _0: UCOutputPart<NonNullable<OPI0>>;
        _1?: UCOutputPart<NonNullable<OPI1>>;
    };
}
export type UCOutputOrNothing<OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> = UCOutput<OPI0, OPI1> | void;
export interface UCOutputDef<OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> {
    parts?: {
        _0: UCOutputPartDef<NonNullable<OPI0>>;
        _1?: UCOutputPartDef<NonNullable<OPI1>>;
    };
    sideEffects?: UCOutputSideEffect[];
}
