import { Container } from 'inversify';

import {
    bindCloudflareWorker,
    bindServer,
    CloudflareD1UCDataStore,
    SyncEdgeWorkerHonoServerManager,
} from '../../../../../../dist/esm/index.cloudflare-worker-hono.js';
import {
    bindCommon,
    bindProduct,
    CONTAINER_OPTS,
    type LLMManager,
    MistralAILLMManager,
    type ServerManager,
    type UCDataStore,
    updateSettings,
} from '../../../../../../dist/esm/index.js';
import { I18n } from '../../../i18n.js';
import { Manifest } from '../../../manifest.js';
import { type S, settings } from './settings.js';

const container = new Container(CONTAINER_OPTS);

bindCommon(container);
updateSettings<S>(container, settings);
bindCloudflareWorker(container);
bindServer(container);
bindProduct(container, Manifest, I18n);

container
    .rebindSync<UCDataStore>('UCDataStore')
    .to(CloudflareD1UCDataStore)
    .inSingletonScope();

container.bind<LLMManager>('LLMManager').to(MistralAILLMManager);
container
    .bind<ServerManager>('ServerManager')
    .to(SyncEdgeWorkerHonoServerManager)
    .inSingletonScope();

export default container;
