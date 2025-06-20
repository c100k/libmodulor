import { Container } from 'inversify';
import {
    bindCommon,
    bindProduct,
    CONTAINER_OPTS,
    type ServerManager,
    type ServerManagerSettings,
    TARGET_DEFAULT_SERVER_MANAGER_SETTINGS,
    type UCDataStore,
} from 'libmodulor';
import {
    bindCloudflareWorker,
    bindServer,
    CloudflareD1UCDataStore,
    SyncEdgeWorkerHonoServerManager,
    type SyncEdgeWorkerHonoServerManagerSettings,
} from 'libmodulor/cloudflare-worker-hono';

import { I18n } from '../../i18n.js';
import { Manifest } from '../../manifest.js';

type S = ServerManagerSettings & SyncEdgeWorkerHonoServerManagerSettings;

const container = new Container(CONTAINER_OPTS);

bindCommon<S>(container, () => ({
    ...TARGET_DEFAULT_SERVER_MANAGER_SETTINGS,
    sewhsm_bindings_uc_data_store: 'UCDataStore',
}));
bindCloudflareWorker(container);
bindServer(container);
bindProduct(container, Manifest, I18n);

container
    .rebindSync<UCDataStore>('UCDataStore')
    .to(CloudflareD1UCDataStore)
    .inSingletonScope();

container
    .bind<ServerManager>('ServerManager')
    .to(SyncEdgeWorkerHonoServerManager)
    .inSingletonScope();

export default container;
