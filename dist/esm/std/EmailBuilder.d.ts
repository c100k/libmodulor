import type { EmailContent, EmailSubject, EmailVars } from './lib/emails.js';
import type { Worker } from './Worker.js';
export interface EmailBuilderInput<V extends EmailVars> {
    vars: V;
}
export interface EmailBuilderOutput {
    content: EmailContent;
    subject: EmailSubject;
}
export interface EmailBuilder<V extends EmailVars> extends Worker<EmailBuilderInput<V>, Promise<EmailBuilderOutput>> {
}
