import type { FreeTextLong, FreeTextShort, HTML } from '../dt/index.js';
import type { I18nLanguageCode } from '../i18n/index.js';
import type { Worker } from './Worker.js';
type EmailRendererInputData = {};
export interface EmailRendererInput<D extends EmailRendererInputData | undefined = undefined> {
    data: D;
    languageCode?: I18nLanguageCode | undefined;
}
export interface EmailRendererOutput {
    html: HTML | null;
    subject: FreeTextShort;
    text: FreeTextLong | null;
}
export interface EmailRenderer<D extends EmailRendererInputData | undefined = undefined> extends Worker<EmailRendererInput<D>, Promise<EmailRendererOutput>> {
}
export {};
