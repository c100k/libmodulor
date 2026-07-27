import type { Email, SSHPrivateKey, SSHPublicKey } from '../dt/index.js';
import type { Clearable, SideEffectable } from '../utils/index.js';
import type { EmailBuilder, EmailBuilderInput } from './EmailBuilder.js';
import type { Settings } from './SettingsManager.js';
export type EmailManagerPrivateKey = SSHPrivateKey;
export type EmailManagerPublicKey = SSHPublicKey;
export interface EmailManagerSettings extends Settings {
    email_manager_enabled: boolean;
    email_manager_from: Email;
    email_manager_reply_to?: Email | undefined;
}
export interface EmailManagerSendInput<I extends EmailBuilderInput | undefined = undefined> {
    builder: EmailBuilder<I>;
    input: I;
    metadata?: {
        bcc?: Email[] | undefined;
        cc?: Email[] | undefined;
        from?: Email | undefined;
        replyTo?: Email | undefined;
    } | undefined;
    to: Email[];
}
export interface EmailManager extends Clearable, SideEffectable {
    send<I extends EmailBuilderInput | undefined = undefined>(input: EmailManagerSendInput<I>): Promise<void>;
    verify(): Promise<void>;
}
