import type { ProductName } from '../../../../product/index.js';
import { type UCDef } from '../../../../uc/index.js';
import { type ProductInput } from '../lib/io.js';
export interface CreateProductInput extends ProductInput {
    productName: ProductName;
}
export declare const CreateProductUCD: UCDef<CreateProductInput>;
