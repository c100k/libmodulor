import type { Email, SSHPrivateKey, SSHPublicKey } from '../dt/index.js';
import type { Clearable, SideEffectable } from '../utils/index.js';
import type { EmailSendArgs, EmailVars } from './lib/emails.js';
import type { Settings } from './SettingsManager.js';
export type EmailManagerPrivateKey = SSHPrivateKey;
export type EmailManagerPublicKey = SSHPublicKey;
export interface EmailManagerSettings extends Settings {
    email_manager_enabled: boolean;
    email_manager_from: Email;
    email_manager_reply_to?: Email | undefined;
}
export interface EmailManager extends Clearable, SideEffectable {
    send<V extends EmailVars>(args: EmailSendArgs<V>): Promise<void>;
    verify(): Promise<void>;
}
