import type { UIntQuantity } from '../dt/index.js';
import type { UCOPIBase } from './opi.js';
export type UCOPILayoutType = string;
export interface UCOPILayoutInput {
}
export interface UCOPILayoutContext {
    availableWidthInPx: UIntQuantity;
    target: 'cli' | 'mobile' | 'web';
}
export type UCOPILayout<OPI extends UCOPIBase, LT extends UCOPILayoutType = UCOPILayoutType, LI extends UCOPILayoutInput = UCOPILayoutInput> = {
    get: (item: OPI, context: UCOPILayoutContext) => LI;
    type: LT;
};
