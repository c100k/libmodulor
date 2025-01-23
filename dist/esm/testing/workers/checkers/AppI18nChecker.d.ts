import type { AppManifest } from '../../../app/index.js';
import type { ErrorMessage } from '../../../dt/index.js';
import type { I18n } from '../../../i18n/index.js';
import type { Worker } from '../../../std/index.js';
export interface Input {
    appI18n: I18n;
    appManifest: Pick<AppManifest, 'languageCodes'>;
}
export interface Output {
    errors: ErrorMessage[];
}
export declare class AppI18nChecker implements Worker<Input, Promise<Output>> {
    private static I18N_KEY_PATTERN;
    private output;
    constructor();
    exec({ appI18n, appManifest }: Input): Promise<Output>;
    private makeSureLanguagesAreConsistent;
    private makeSureKeysAndLabelsAreValid;
}
