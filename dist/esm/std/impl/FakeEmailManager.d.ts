import type { Email } from '../../dt/index.js';
import type { EmailManager, EmailManagerEmailDef, EmailManagerEmailDefInputBase } from '../EmailManager.js';
export declare class FakeEmailManager implements EmailManager {
    entries: {
        def: EmailManagerEmailDef<any>;
        replyTo?: Email | undefined;
        to: Email[];
    }[];
    constructor();
    clear(): Promise<void>;
    send<I extends EmailManagerEmailDefInputBase>(def: EmailManagerEmailDef<I>, to: Email[], replyTo?: Email | undefined): Promise<void>;
    verify(): Promise<void>;
}
