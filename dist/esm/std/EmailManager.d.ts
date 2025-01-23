import type { Email, FreeTextShort, HTML, SSHPrivateKey, SSHPublicKey } from '../dt/index.js';
import type { WordingManager } from '../i18n/index.js';
import type { Clearable } from '../utils/index.js';
import type { I18nManager } from './I18nManager.js';
import type { Settings } from './SettingsManager.js';
export type EmailManagerPrivateKey = SSHPrivateKey;
export type EmailManagerPublicKey = SSHPublicKey;
export interface EmailManagerSettings extends Settings {
    email_manager_enabled: boolean;
    email_manager_from: Email;
    email_manager_replyTo?: Email | undefined;
}
export interface EmailManagerEmailDefInputBase {
    i18nManager: I18nManager;
    wordingManager: WordingManager;
}
export interface EmailManagerEmailDef<I extends EmailManagerEmailDefInputBase> {
    html(): HTML;
    input: I;
    subj(): FreeTextShort;
}
export interface EmailManager extends Clearable {
    send<I extends EmailManagerEmailDefInputBase>(def: EmailManagerEmailDef<I>, to: Email[], replyTo?: Email | undefined): Promise<void>;
    verify(): Promise<void>;
}
