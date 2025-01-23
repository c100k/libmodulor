import { JoseJWTManager } from '../../index.std-jwt-manager-jose.js';
import { FakeEmailManager } from '../../std/impl/FakeEmailManager.js';
import { FakeJobManager } from '../../std/impl/FakeJobManager.js';
export function bindServer(container) {
    container.bind('EmailManager').to(FakeEmailManager);
    container.bind('JWTManager').to(JoseJWTManager);
    container.bind('JobManager').to(FakeJobManager);
}
