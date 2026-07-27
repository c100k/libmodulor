import type { FreeTextLong, FreeTextShort, HTML } from '../dt/index.js';
import type { I18nLanguageCode } from '../i18n/index.js';
import type { Worker } from './Worker.js';
export interface EmailBuilderInput {
    languageCode?: I18nLanguageCode | undefined;
}
export type EmailBuilderOutput = {
    subject: FreeTextShort;
} & ({
    html: HTML;
} | {
    text: FreeTextLong;
});
export interface EmailBuilder<I extends EmailBuilderInput | undefined = undefined> extends Worker<I, Promise<EmailBuilderOutput>> {
}
