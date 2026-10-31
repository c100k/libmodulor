import type { ProductName } from '../../../../product/index.js';
import { type TargetName } from '../../../../target/index.js';
import { type UCDef } from '../../../../uc/index.js';
import { type ProductInput } from '../lib/io.js';
export interface CreateTargetInput extends ProductInput {
    productName: ProductName;
    targetName: TargetName;
}
export declare const CreateTargetUCD: UCDef<CreateTargetInput>;
