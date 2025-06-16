import type { Container } from 'inversify';
import {
    type EmailManager,
    FakeEmailManager,
    FakeJobManager,
    type JobManager,
    type JWTManager,
} from 'libmodulor';
import { JoseJWTManager } from 'libmodulor/std-jwt-manager-jose';

export function bindServer(container: Container): void {
    // std
    container.bind<EmailManager>('EmailManager').to(FakeEmailManager);
    container.bind<JWTManager>('JWTManager').to(JoseJWTManager);
    container.bind<JobManager>('JobManager').to(FakeJobManager);
}
