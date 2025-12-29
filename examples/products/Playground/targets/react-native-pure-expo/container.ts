import { Container } from 'inversify';

import {
    bindCommon,
    bindProduct,
    CONTAINER_OPTS,
    type CryptoManager,
    type FSManager,
    type JWTManager,
    type ServerClientManager,
    updateSettings,
} from '../../../../../dist/esm/index.js';
import { bindRN } from '../../../../../dist/esm/index.rn.js';
import { I18n } from '../../i18n.js';
import { Manifest } from '../../manifest.js';
import { RNCryptoManager } from './lib/std/RNCryptoManager.js';
import { RNFSManager } from './lib/std/RNFSManager.js';
import { RNJWTManager } from './lib/std/RNJWTManager.js';
import { RNServerClientManager } from './lib/std/RNServerClientManager.js';
import type { AuthDataStore } from './lib/uc/AuthDataStore.js';
import { InMemoryAuthDataStore } from './lib/uc/InMemoryAuthDataStore.js';
import { type S, settings } from './settings.js';

const container = new Container(CONTAINER_OPTS);

bindCommon(container);
updateSettings<S>(container, settings);
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
