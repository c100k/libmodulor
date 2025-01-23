import type { FilePath } from '../dt/index.js';
import type { Settings } from '../std/index.js';
import type { UCDataStoreDatasetName } from './data-store.js';
import type { UCFileInputFieldRefPrefix } from './file.js';
import type { UCName } from './metadata.js';
export interface UCSettings extends Settings {
    uc_data_store_ucs_dataset_name: UCDataStoreDatasetName;
    uc_disabled_use_cases: UCName[];
    uc_file_ref_prefix: UCFileInputFieldRefPrefix;
    uc_files_directory_path: FilePath;
}
