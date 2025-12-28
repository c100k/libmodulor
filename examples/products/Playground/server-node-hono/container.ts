import { Container } from 'inversify';

import {
    bindCommon,
    bindProduct,
    CONTAINER_OPTS,
    type LLMManager,
    MistralAILLMManager,
    type ServerManager,
    type UCDataStore,
    updateSettings,
} from '../../../../dist/esm/index.js';
import { bindNodeCore } from '../../../../dist/esm/index.node.js';
import {
    bindServer,
    NodeHonoServerManager,
} from '../../../../dist/esm/index.node-hono.js';
import { KnexUCDataStore } from '../../../../dist/esm/index.uc-data-store-knex.js';
import { I18n } from '../i18n.js';
import { Manifest } from '../manifest.js';
import { type S, settings } from './settings.js';

const container = new Container(CONTAINER_OPTS);

bindCommon(container);
updateSettings<S>(container, settings);
bindNodeCore(container);
bindServer(container);
bindProduct(container, Manifest, I18n);

container.rebindSync<UCDataStore>('UCDataStore').to(KnexUCDataStore);

container.bind<LLMManager>('LLMManager').to(MistralAILLMManager);
container.bind<ServerManager>('ServerManager').to(NodeHonoServerManager);

export default container;
