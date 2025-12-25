import { Container } from 'inversify';

import {
    bindCommon,
    bindProduct,
    CONTAINER_OPTS,
    type ServerManager,
    updateSettings,
} from '../../../../dist/esm/index.js';
import { bindNodeCore } from '../../../../dist/esm/index.node.js';
import { NodeLocalStdioMCPServerManager } from '../../../../dist/esm/index.node-mcp.js';
import { I18n } from '../i18n.js';
import { Manifest } from '../manifest.js';
import { type S, settings } from './settings.js';

const container = new Container(CONTAINER_OPTS);

bindCommon(container);
updateSettings<S>(container, settings);
bindNodeCore(container);
bindProduct(container, Manifest, I18n);

container
    .bind<ServerManager>('ServerManager')
    .to(NodeLocalStdioMCPServerManager);

export default container;
