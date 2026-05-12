import type { UIntQuantity } from '../dt/index.js';
export interface UCFieldDefCardinality {
    max?: UIntQuantity;
    min?: UIntQuantity;
}
export declare function ucfIsMandatory(cardinality?: UCFieldDefCardinality): boolean;
export declare function ucfRepeatability(cardinality?: UCFieldDefCardinality): [boolean, UIntQuantity];
