import { Container } from 'inversify';
import {
    CONTAINER_OPTS,
    EnvSettingsManager,
    type ServerClientManagerSettings,
    type SettingsManager,
    TARGET_DEFAULT_SERVER_CLIENT_MANAGER_SETTINGS,
    bindCommon,
    bindProduct,
} from 'libmodulor';
import { bindNodeCLI, bindNodeCore } from 'libmodulor/node';

import { I18n } from '../i18n.js';
import { Manifest } from '../manifest.js';

const container = new Container(CONTAINER_OPTS);

bindCommon<ServerClientManagerSettings>(container, () => ({
    ...TARGET_DEFAULT_SERVER_CLIENT_MANAGER_SETTINGS,
}));
bindNodeCore(container);
bindNodeCLI(container);
bindProduct(container, Manifest, I18n);

(await container.rebind<SettingsManager>('SettingsManager')).to(
    EnvSettingsManager,
);

export default container;
