import { Container } from 'inversify';

import {
    bindCommon,
    bindProduct,
    CONTAINER_OPTS,
    type JWTManager,
    type ServerClientManagerSettings,
    TARGET_DEFAULT_SERVER_CLIENT_MANAGER_SETTINGS,
} from '../../../../../dist/esm/index.js';
import { JoseJWTManager } from '../../../../../dist/esm/index.std-jwt-manager-jose.js';
import { bindWeb } from '../../../../../dist/esm/index.web.js';
import { I18n } from '../../i18n.js';
import { Manifest } from '../../manifest.js';

type S = ServerClientManagerSettings;

const container = new Container(CONTAINER_OPTS);

bindCommon<S>(container, () => ({
    ...TARGET_DEFAULT_SERVER_CLIENT_MANAGER_SETTINGS,
    server_public_url: 'http://localhost:3000',
}));
bindWeb(container);
bindProduct(container, Manifest, I18n);

container.bind<JWTManager>('JWTManager').to(JoseJWTManager);

export default container;
