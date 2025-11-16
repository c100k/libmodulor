import { Container } from 'inversify';
import { Platform } from 'react-native';

import {
    bindCommon,
    bindProduct,
    CONTAINER_OPTS,
    type CryptoManager,
    type FSManager,
    type JWTManager,
    type ServerClientManager,
    type ServerClientManagerSettings,
    TARGET_DEFAULT_SERVER_CLIENT_MANAGER_SETTINGS,
} from '../../../../dist/esm/index.js';
import { bindRN } from '../../../../dist/esm/index.rn.js';
import { I18n } from '../i18n.js';
import { Manifest } from '../manifest.js';
import { RNCryptoManager } from './lib/std/RNCryptoManager.js';
import { RNFSManager } from './lib/std/RNFSManager.js';
import { RNJWTManager } from './lib/std/RNJWTManager.js';
import { RNServerClientManager } from './lib/std/RNServerClientManager.js';
import type { AuthDataStore } from './lib/uc/AuthDataStore.js';
import { InMemoryAuthDataStore } from './lib/uc/InMemoryAuthDataStore.js';

type S = ServerClientManagerSettings;

const container = new Container(CONTAINER_OPTS);

bindCommon<S>(container, () => ({
    ...TARGET_DEFAULT_SERVER_CLIENT_MANAGER_SETTINGS,
    server_public_url:
        Platform.OS === 'android'
            ? 'http://10.0.2.2:7443'
            : 'http://localhost:7443',
}));
bindRN(container);
bindProduct(container, Manifest, I18n);

container.bind<CryptoManager>('CryptoManager').to(RNCryptoManager);
container.bind<FSManager>('FSManager').to(RNFSManager);
container.bind<JWTManager>('JWTManager').to(RNJWTManager);
container
    .rebindSync<ServerClientManager>('ServerClientManager')
    .to(RNServerClientManager);
container
    .bind<AuthDataStore>('AuthDataStore')
    .to(InMemoryAuthDataStore)
    .inSingletonScope();

export default container;
