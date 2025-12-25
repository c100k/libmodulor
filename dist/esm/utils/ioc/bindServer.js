import { FakeEmailManager } from '../../std/impl/FakeEmailManager.js';
import { FakeJobManager } from '../../std/impl/FakeJobManager.js';
import { JoseJWTManager } from '../../std/impl/JoseJWTManager.js';
export function bindServer(container) {
    // std
    container
        .bind('EmailManager')
        .to(FakeEmailManager)
        .inSingletonScope();
    container.bind('JWTManager').to(JoseJWTManager);
    container
        .bind('JobManager')
        .to(FakeJobManager)
        .inSingletonScope();
}
