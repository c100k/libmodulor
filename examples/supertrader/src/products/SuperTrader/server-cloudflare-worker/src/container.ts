import { Container } from 'inversify';
import {
    bindCommon,
    bindProduct,
    CONTAINER_OPTS,
    type ServerManager,
    type ServerManagerSettings,
    TARGET_DEFAULT_SERVER_MANAGER_SETTINGS,
} from 'libmodulor';

import { I18n } from '../../i18n.js';
import { Manifest } from '../../manifest.js';
import { bindCloudflareWorker } from './internal/bindCloudflareWorker.js';
import { bindServer } from './internal/bindServer.js';
import { CloudflareWorkerHonoServerManager } from './internal/CloudflareWorkerHonoServerManager.js';

type S = ServerManagerSettings;

const container = new Container(CONTAINER_OPTS);

bindCommon<S>(container, () => ({
    ...TARGET_DEFAULT_SERVER_MANAGER_SETTINGS,
}));
bindCloudflareWorker(container);
bindServer(container);
bindProduct(container, Manifest, I18n);

container
    .bind<ServerManager>('ServerManager')
    .to(CloudflareWorkerHonoServerManager);

export default container;
