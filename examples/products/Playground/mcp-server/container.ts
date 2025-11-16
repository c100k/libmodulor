import { Container } from 'inversify';

import {
    bindCommon,
    bindProduct,
    CONTAINER_OPTS,
    type ServerManager,
    type ServerManagerSettings,
    TARGET_DEFAULT_SERVER_MANAGER_SETTINGS,
} from '../../../../dist/esm/index.js';
import { bindNodeCore } from '../../../../dist/esm/index.node.js';
import { NodeLocalStdioMCPServerManager } from '../../../../dist/esm/index.node-mcp.js';
import { I18n } from '../i18n.js';
import { Manifest } from '../manifest.js';

type S = ServerManagerSettings;

const container = new Container(CONTAINER_OPTS);

bindCommon<S>(container, () => ({
    ...TARGET_DEFAULT_SERVER_MANAGER_SETTINGS,
    logger_level: 'error',
}));
bindNodeCore(container);
bindProduct(container, Manifest, I18n);

container
    .bind<ServerManager>('ServerManager')
    .to(NodeLocalStdioMCPServerManager);

export default container;
