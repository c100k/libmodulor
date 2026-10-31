import type { ProductName } from '../../../../product/index.js';
import { type UCDef, type UCInputFieldValue } from '../../../../uc/index.js';
import { type ProductInput } from '../lib/io.js';
export interface CreateProductInput extends ProductInput {
    productName: UCInputFieldValue<ProductName>;
}
export declare const CreateProductUCD: UCDef<CreateProductInput>;
