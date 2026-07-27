import type { Email } from '../../dt/index.js';
import type { ProductManifest } from '../../product/index.js';
import type { EmailBuilder } from '../EmailBuilder.js';
import type { EmailManager, EmailManagerSettings } from '../EmailManager.js';
import type { EmailMetadata, EmailVars } from '../lib/emails.js';
import type { Configurable, SettingsManager } from '../SettingsManager.js';
import type { Worker } from '../Worker.js';
interface Input<V extends EmailVars = EmailVars> {
    builder: EmailBuilder<V>;
    metadata?: EmailMetadata | undefined;
    to: Email[];
    vars: V;
}
type S = Omit<EmailManagerSettings, 'email_manager_enabled'>;
export declare class EmailSender implements Configurable<S>, Worker<Input, Promise<void>> {
    private emailManager;
    private productManifest;
    private settingsManager;
    constructor(emailManager: EmailManager, productManifest: ProductManifest, settingsManager: SettingsManager<S>);
    s(): S;
    exec<V extends EmailVars>({ builder, metadata, to, vars, }: Input<V>): Promise<void>;
}
export {};
