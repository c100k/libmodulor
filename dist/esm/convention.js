/*
 * Common
 */
export const SRC_DIR_NAME = 'src';
/*
 * App
 */
export const APPS_ROOT_DIR_NAME = 'apps';
export const APPS_ROOT_ALIAS = `@${APPS_ROOT_DIR_NAME}`;
export const APPS_ROOT_PATH = [SRC_DIR_NAME, APPS_ROOT_DIR_NAME];
export const APP_DOCS_FILE_NAME = 'README.md';
export const APP_I18N_NAME = 'I18n';
export const APP_I18N_FILE_NAME = `${APP_I18N_NAME.toLowerCase()}.ts`;
export const APP_INDEX_NAME = 'index';
export const APP_INDEX_FILE_NAME = `${APP_INDEX_NAME}.ts`;
export const APP_INDEX_FILE_NAME_FOR_IMPORT = 'index.js'; // ESM
export const APP_MANIFEST_NAME = 'Manifest';
export const APP_MANIFEST_FILE_EXT = '.ts';
export const APP_MANIFEST_FILE_NAME = `${APP_MANIFEST_NAME.toLowerCase()}.ts`;
export const APP_NAME_PLACEHOLDER = 'AppX';
export const APP_ROOT_FROM_UCD = ['..', '..', '..']; // $root/src/ucds/XyzUCD.ts
export const APP_SRC_DIR_NAME = SRC_DIR_NAME;
export const APP_SRC_UCDS_DIR_NAME = 'ucds';
export const APP_TEST_DIR_NAME = 'test';
export const APP_TEST_MAIN_FILE_NAME = 'App.test.ts';
export const APP_TEST_REPORTS_DIR_NAME = 'reports';
/*
 * Product
 */
export const PRODUCTS_ROOT_ALIAS = '@p';
export const PRODUCTS_ROOT_PATH = [SRC_DIR_NAME, 'products'];
export const PRODUCT_MANIFEST_NAME = 'Manifest';
export const PRODUCT_MANIFEST_FILE_NAME = `${PRODUCT_MANIFEST_NAME.toLowerCase()}.js`; // .js vs .ts so it can be used by bundlers like Webpack
export const PRODUCT_NAME_PLACEHOLDER = 'ProductX';
/*
 * Use Case
 */
export const UC_DEF_SUFFIX = 'UCD';
export const UC_DEF_FILE_NAME_EXT = '.ts';
export const UC_DEF_FILE_NAME_SUFFIX = `${UC_DEF_SUFFIX}${UC_DEF_FILE_NAME_EXT}`;
export const UC_DEF_TYPE = 'UCDef';
export const UC_INPUT_BASE = 'UCInput';
export const UC_INPUT_FIELD_PATTERN = '^UCInputFieldValue<(.*)>$';
export const UC_INPUT_SUFFIX = 'Input';
export const UC_MAIN_SUFFIX = 'Main';
export const UC_MAIN_CLIENT_SUFFIX = `Client${UC_MAIN_SUFFIX}`;
export const UC_MAIN_SERVER_SUFFIX = `Server${UC_MAIN_SUFFIX}`;
export const UC_MAIN_STEP_PREFIX_REGULAR = '// >=>';
export const UC_OPI_BASE = 'UCOPIBase';
export const UC_OPI_SUFFIX = 'OPI';
export const UC_POLICY_SUFFIX = 'Policy';
export const UC_POLICY_SUFFIX_FULL = `UC${UC_POLICY_SUFFIX}`;
