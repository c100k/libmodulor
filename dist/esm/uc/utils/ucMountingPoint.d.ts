import type { UCInput } from '../input.js';
import { type FQUCName, parseFQUCName } from '../metadata.js';
import type { UCOPIBase } from '../opi.js';
import type { UC } from '../UC.js';
export type UCMountingPoint = FQUCName | (string & {});
export declare function ucMountingPoint<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined>(uc: UC<I, OPI0, OPI1>): UCMountingPoint;
export declare function parseUCMountingPoint(value: string): ReturnType<typeof parseFQUCName>;
