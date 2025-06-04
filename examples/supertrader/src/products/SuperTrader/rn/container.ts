import { Container } from 'inversify';
import {
    bindCommon,
    bindProduct,
    CONTAINER_OPTS,
    type CryptoManager,
    type FSManager,
    type ServerClientManagerSettings,
    TARGET_DEFAULT_SERVER_CLIENT_MANAGER_SETTINGS,
} from 'libmodulor';
import { bindRN } from 'libmodulor/rn';
import { Platform } from 'react-native';

import { I18n } from '../i18n.js';
import { Manifest } from '../manifest.js';
import { RNCryptoManager } from './lib/std/RNCryptoManager.js';
import { RNFSManager } from './lib/std/RNFSManager.js';

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

export default container;
