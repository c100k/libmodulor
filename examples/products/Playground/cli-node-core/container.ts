import { Container } from 'inversify';

import {
    bindCommon,
    bindProduct,
    CONTAINER_OPTS,
    EnvSettingsManager,
    type SettingsManager,
    updateSettings,
} from '../../../../dist/esm/index.js';
import { bindNodeCLI, bindNodeCore } from '../../../../dist/esm/index.node.js';
import { I18n } from '../i18n.js';
import { Manifest } from '../manifest.js';
import { type S, settings } from './settings.js';

const container = new Container(CONTAINER_OPTS);

bindCommon(container);
updateSettings<S>(container, settings);
bindNodeCore(container);
bindNodeCLI(container);
bindProduct(container, Manifest, I18n);

(await container.rebind<SettingsManager>('SettingsManager')).to(
    EnvSettingsManager,
);

export default container;
