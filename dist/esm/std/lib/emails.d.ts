import type { Email, HTML } from '../../dt/index.js';
import type { I18nLanguageCode } from '../../i18n/index.js';
export interface EmailContent {
    html: HTML | null;
    text: string | null;
}
export interface EmailMetadata {
    bcc?: Email[] | undefined;
    cc?: Email[] | undefined;
    from?: Email | undefined;
    replyTo?: Email | undefined;
}
export type EmailSubject = string;
export interface EmailVars {
    lang?: I18nLanguageCode | undefined;
}
export type EmailSendArgs<V extends EmailVars> = {
    metadata?: EmailMetadata;
    subject: EmailSubject;
    to: Email[];
    vars: V;
} & EmailContent;
