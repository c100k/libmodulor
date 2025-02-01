import { Container } from 'inversify';
import {
    CONTAINER_OPTS,
    type CryptoManager,
    type FSManager,
    type ServerClientManagerSettings,
    TARGET_DEFAULT_SERVER_CLIENT_MANAGER_SETTINGS,
    bindCommon,
    bindProduct,
} from 'libmodulor';
import { bindRN } from 'libmodulor/rn';

import { I18n } from '../i18n.js';
import { Manifest } from '../manifest.js';
import { RNCryptoManager } from './lib/std/RNCryptoManager.js';
import { RNFSManager } from './lib/std/RNFSManager.js';

type S = ServerClientManagerSettings;

const container = new Container(CONTAINER_OPTS);

bindCommon<S>(container, () => ({
    ...TARGET_DEFAULT_SERVER_CLIENT_MANAGER_SETTINGS,
}));
bindRN(container);
bindProduct(container, Manifest, I18n);

container.bind<CryptoManager>('CryptoManager').to(RNCryptoManager);
container.bind<FSManager>('FSManager').to(RNFSManager);

export default container;
