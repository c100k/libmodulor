import { APP_I18N_FILE_NAME, APP_I18N_NAME, APP_INDEX_FILE_NAME, APP_MANIFEST_FILE_NAME, APP_MANIFEST_NAME, APP_SRC_DIR_NAME, } from '../../../../../convention.js';
import { I18N_DEFAULT_LANG } from '../../../../../i18n/index.js';
import { LIB_NAME } from '../consts.js';
import { fileImportName } from '../funcs.js';
const INDEX_TS = `// Expose only what's necessary

export { ${APP_I18N_NAME} } from './${APP_SRC_DIR_NAME}/${fileImportName(APP_I18N_FILE_NAME)}';
export { ${APP_MANIFEST_NAME} } from './${APP_SRC_DIR_NAME}/${fileImportName(APP_MANIFEST_FILE_NAME)}';
`;
const I18N_TS = `import type { AppI18n } from '${LIB_NAME}';

export const ${APP_I18N_NAME} = {
    ${I18N_DEFAULT_LANG}: {},
} satisfies AppI18n;
`;
const MANIFEST_TS = (name) => `import type { AppManifest } from '${LIB_NAME}';

export const ${APP_MANIFEST_NAME} = {
    languageCodes: ['${I18N_DEFAULT_LANG}'],
    name: '${name}',
    ucReg: {},
} satisfies AppManifest;
`;
export function files(name) {
    return new Map([
        [['.', APP_INDEX_FILE_NAME], INDEX_TS],
        [[APP_SRC_DIR_NAME, APP_I18N_FILE_NAME], I18N_TS],
        [[APP_SRC_DIR_NAME, APP_MANIFEST_FILE_NAME], MANIFEST_TS(name)],
    ]);
}
