import type { ProductName } from '../../../../product/index.js';
import { type TargetName } from '../../../../target/index.js';
import { type UCDef, type UCInputFieldValue } from '../../../../uc/index.js';
import { type ProductInput } from '../lib/io.js';
export interface CreateTargetInput extends ProductInput {
    productName: UCInputFieldValue<ProductName>;
    targetName: UCInputFieldValue<TargetName>;
}
export declare const CreateTargetUCD: UCDef<CreateTargetInput>;
