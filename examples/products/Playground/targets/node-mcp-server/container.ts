import { Container } from 'inversify';

import {
    type AuthDataStore,
    bindCommon,
    bindProduct,
    CONTAINER_OPTS,
    InMemoryAuthDataStore,
    type JWTManager,
    MixedServerClientManager,
    type ServerClientManager,
    type ServerManager,
    type UCClientConfirmManager,
    updateSettings,
} from '../../../../../dist/esm/index.js';
import { bindNodeCore } from '../../../../../dist/esm/index.node.js';
import {
    MCPUCClientConfirmManager,
    NodeLocalStdioMCPServerManager,
} from '../../../../../dist/esm/index.node-mcp.js';
import { JoseJWTManager } from '../../../../../dist/esm/index.std-jwt-manager-jose.js';
import { I18n } from '../../i18n.js';
import { Manifest } from '../../manifest.js';
import { type S, settings } from './settings.js';

const container = new Container(CONTAINER_OPTS);

bindCommon(container);
updateSettings<S>(container, settings);
bindNodeCore(container);
bindProduct(container, Manifest, I18n);

container
    .bind<AuthDataStore>('AuthDataStore')
    .to(InMemoryAuthDataStore)
    .inSingletonScope();
container.bind<JWTManager>('JWTManager').to(JoseJWTManager);
(await container.rebind<UCClientConfirmManager>('UCClientConfirmManager')).to(
    MCPUCClientConfirmManager,
);
container
    .bind<ServerManager>('ServerManager')
    .to(NodeLocalStdioMCPServerManager);
container
    .rebindSync<ServerClientManager>('ServerClientManager')
    .to(MixedServerClientManager);

export default container;
