import type { APP_MANIFEST_NAME } from '../convention.js';
import type { I18nLanguageCode } from '../i18n/index.js';
import type { UCMetadata, UCName } from '../uc/index.js';
export type AppManifestSource = any;
export type AppManifestSourceSafe = {
    [key: typeof APP_MANIFEST_NAME]: AppManifest;
};
export type AppUCReg = Record<UCName, UCMetadata>;
export interface AppManifest {
    languageCodes: I18nLanguageCode[];
    name: AppName;
    ucReg: AppUCReg;
}
export type AppName = Capitalize<string>;
