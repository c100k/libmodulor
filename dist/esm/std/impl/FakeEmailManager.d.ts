import type { AnySideEffect } from '../../utils/index.js';
import type { EmailManager } from '../EmailManager.js';
import type { EmailSendArgs, EmailVars } from '../lib/emails.js';
export declare class FakeEmailManager implements EmailManager {
    entries: EmailSendArgs<any>[];
    constructor();
    clear(): Promise<void>;
    sideEffects(): Promise<AnySideEffect[]>;
    send<V extends EmailVars>(args: EmailSendArgs<V>): Promise<void>;
    verify(): Promise<void>;
}
