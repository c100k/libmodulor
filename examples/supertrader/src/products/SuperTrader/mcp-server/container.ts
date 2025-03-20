import { Container } from 'inversify';
import {
    CONTAINER_OPTS,
    type ServerClientManagerSettings,
    type ServerManager,
    TARGET_DEFAULT_SERVER_CLIENT_MANAGER_SETTINGS,
    bindCommon,
    bindProduct,
} from 'libmodulor';
import { bindNodeCore } from 'libmodulor/node';
import { NodeLocalStdioMCPServerManager } from 'libmodulor/node-mcp';

import { I18n } from '../i18n.js';
import { Manifest } from '../manifest.js';

type S = ServerClientManagerSettings;

const container = new Container(CONTAINER_OPTS);

bindCommon<S>(container, () => ({
    ...TARGET_DEFAULT_SERVER_CLIENT_MANAGER_SETTINGS,
    logger_level: 'error',
}));
bindNodeCore(container);
bindProduct(container, Manifest, I18n);

container
    .bind<ServerManager>('ServerManager')
    .to(NodeLocalStdioMCPServerManager);

export default container;
