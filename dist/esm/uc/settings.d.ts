import type { FilePath } from '../dt/index.js';
import type { Settings } from '../std/index.js';
import type { UCDataStoreDatasetName } from './data-store.js';
import type { UCFileInputFieldRefPrefix } from './file.js';
import type { UCName } from './metadata.js';
export interface UCSettings extends Settings {
    /**
     * The name of the collection/table storing the persisted use cases in the data store
     *
     * @default UC_DEFAULT_SETTINGS.uc_data_store_ucs_dataset_name
     */
    uc_data_store_ucs_dataset_name: UCDataStoreDatasetName;
    /**
     * The list of disabled use cases (see {@link UCExecChecker})
     *
     * This should be used only in specific cases (e.g. disabling in emergency a use case in production).
     *
     * If you want a feature-flag like mechanism, chances are you need a dedicated setting, "wrapping" multiple use cases.
     *
     * @default UC_DEFAULT_SETTINGS.uc_disabled_use_cases
     */
    uc_disabled_use_cases: UCName[];
    /**
     * The prefix of the file path when the use case has been processed, before storing
     * @default UC_DEFAULT_SETTINGS.uc_file_ref_prefix
     */
    uc_file_ref_prefix: UCFileInputFieldRefPrefix;
    /**
     * The directory path where the use case input files are copied after being processed
     *
     * In the future, we can imagine storing in other types of storage (e.g. S3-like).
     *
     * @default UC_DEFAULT_SETTINGS.uc_files_directory_path
     */
    uc_files_directory_path: FilePath;
}
