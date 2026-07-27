import type { AnySideEffect } from '../../utils/index.js';
import type { EmailBuilderInput } from '../EmailBuilder.js';
import type { EmailManager, EmailManagerSendInput } from '../EmailManager.js';
export declare class FakeEmailManager implements EmailManager {
    entries: {
        i: EmailManagerSendInput<any>;
    }[];
    constructor();
    clear(): Promise<void>;
    sideEffects(): Promise<AnySideEffect[]>;
    send<I extends EmailBuilderInput | undefined = undefined>(input: EmailManagerSendInput<I>): Promise<void>;
    verify(): Promise<void>;
}
