import type { AnySideEffect } from '../../utils/index.js';
import type { EmailManager, EmailManagerSendInput } from '../EmailManager.js';
export declare class FakeEmailManager implements EmailManager {
    entries: {
        input: EmailManagerSendInput;
    }[];
    constructor();
    clear(): Promise<void>;
    sideEffects(): Promise<AnySideEffect[]>;
    send(input: EmailManagerSendInput): Promise<void>;
    verify(): Promise<void>;
}
