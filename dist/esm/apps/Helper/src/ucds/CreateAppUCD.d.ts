import type { AppName } from '../../../../app/index.js';
import type { FSManager, I18nManager, Logger } from '../../../../std/index.js';
import { type UCDef, type UCInputFieldValue, type UCMain, type UCMainInput } from '../../../../uc/index.js';
import { type AppInput } from '../lib/io.js';
import { SrcFilesGenerator } from '../lib/SrcFilesGenerator.js';
export interface CreateAppInput extends AppInput {
    appName: UCInputFieldValue<AppName>;
}
export declare class CreateAppClientMain implements UCMain<CreateAppInput> {
    private fsManager;
    private i18nManager;
    private logger;
    private srcFilesGenerator;
    private rootPath;
    constructor(fsManager: FSManager, i18nManager: I18nManager, logger: Logger, srcFilesGenerator: SrcFilesGenerator);
    exec({ uc }: UCMainInput<CreateAppInput>): Promise<void>;
    private assertNotExisting;
    private createRootDir;
}
export declare const CreateAppUCD: UCDef<CreateAppInput>;
