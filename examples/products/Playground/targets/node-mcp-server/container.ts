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
    MCPStdioUCClientConfirmManager,
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

(await container.rebind<UCClientConfirmManager>('UCClientConfirmManager')).to(
    MCPStdioUCClientConfirmManager,
);

container
    .bind<AuthDataStore>('AuthDataStore')
    .to(InMemoryAuthDataStore)
    .inSingletonScope();
container.bind<JWTManager>('JWTManager').to(JoseJWTManager);
container
    .bind<ServerManager>('ServerManager')
    .to(NodeLocalStdioMCPServerManager);
container
    .rebindSync<ServerClientManager>('ServerClientManager')
    .to(MixedServerClientManager);

export default container;
