import { PRODUCT_I18N_FILE_NAME, PRODUCT_I18N_NAME, PRODUCT_MANIFEST_FILE_NAME, } from '../../../../../convention.js';
import { I18N_DEFAULT_LANG } from '../../../../../i18n/index.js';
const I18N_TS = `import type { ProductI18n } from 'libmodulor';
import { I18n${I18N_DEFAULT_LANG.toLocaleUpperCase()} } from 'libmodulor/locales/${I18N_DEFAULT_LANG}';

export const ${PRODUCT_I18N_NAME} = {
    ${I18N_DEFAULT_LANG}: {
        ...I18n${I18N_DEFAULT_LANG.toLocaleUpperCase()},
        p_desc: '',
        p_slogan: '',
    },
} satisfies ProductI18n;
`;
const MANIFEST_TS = (name) => `import type { ProductManifest } from 'libmodulor';

export const Manifest = {
    appReg: [],
    name: '${name}',
} satisfies ProductManifest;
`;
export function files(name) {
    return new Map([
        [['.', PRODUCT_I18N_FILE_NAME], I18N_TS],
        [['.', PRODUCT_MANIFEST_FILE_NAME], MANIFEST_TS(name)],
    ]);
}
