import { Container } from 'inversify';

import {
    bindCommon,
    bindProduct,
    CONTAINER_OPTS,
    type JWTManager,
    updateSettings,
} from '../../../../../../dist/esm/index.js';
import { JoseJWTManager } from '../../../../../../dist/esm/index.std-jwt-manager-jose.js';
import { bindWeb } from '../../../../../../dist/esm/index.web.js';
import { I18n } from '../../../i18n.js';
import { Manifest } from '../../../manifest.js';
import { type S, settings } from './settings-client.js';

const container = new Container(CONTAINER_OPTS);

bindCommon(container);
updateSettings<S>(container, settings);
bindWeb(container);
bindProduct(container, Manifest, I18n);

container.bind<JWTManager>('JWTManager').to(JoseJWTManager);

export default container;
