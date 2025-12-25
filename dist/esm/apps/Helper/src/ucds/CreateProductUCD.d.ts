import type { ProductName } from '../../../../product/index.js';
import type { FSManager, I18nManager, Logger } from '../../../../std/index.js';
import { type UCDef, type UCInputFieldValue, type UCMain, type UCMainInput } from '../../../../uc/index.js';
import { type ProductInput } from '../lib/io.js';
import { SrcFilesGenerator } from '../lib/SrcFilesGenerator.js';
export interface CreateProductInput extends ProductInput {
    productName: UCInputFieldValue<ProductName>;
}
export declare class CreateProductClientMain implements UCMain<CreateProductInput> {
    private fsManager;
    private i18nManager;
    private logger;
    private srcFilesGenerator;
    private rootPath;
    constructor(fsManager: FSManager, i18nManager: I18nManager, logger: Logger, srcFilesGenerator: SrcFilesGenerator);
    exec({ uc }: UCMainInput<CreateProductInput>): Promise<void>;
    private assertNotExisting;
    private createRootDir;
}
export declare const CreateProductUCD: UCDef<CreateProductInput>;
