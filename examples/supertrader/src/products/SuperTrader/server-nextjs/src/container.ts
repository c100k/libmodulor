import { Container } from 'inversify';
import {
    CONTAINER_OPTS,
    type ServerClientManagerSettings,
    bindCommon,
    bindProduct,
} from 'libmodulor';
import { bindWeb } from 'libmodulor/web';

import { I18n } from '../../i18n.js';
import { Manifest } from '../../manifest.js';

type S = ServerClientManagerSettings;

const container = new Container(CONTAINER_OPTS);

bindCommon<S>(container);
bindWeb(container);
bindProduct(container, Manifest, I18n);

export default container;
