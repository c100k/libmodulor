import type { File, FilePath } from '../../dt/index.js';
import type { Configurable, FSManager, SettingsManager, Worker } from '../../std/index.js';
import type { UCInputFieldValue } from '../input-field.js';
import type { UCSettings } from '../settings.js';
interface Input {
    files: UCInputFieldValue<File>;
    keepOnlyFileName: boolean;
}
interface Output {
    filePaths: FilePath[];
}
type S = Pick<UCSettings, 'uc_file_ref_prefix' | 'uc_files_directory_path'>;
export declare class UCOutputFilesProcessor implements Configurable<S>, Worker<Input, Promise<Output>> {
    private fsManager;
    private settingsManager;
    constructor(fsManager: FSManager, settingsManager: SettingsManager<S>);
    s(): S;
    exec({ files, keepOnlyFileName }: Input): Promise<Output>;
}
export {};
