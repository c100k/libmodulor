import { APPS_ROOT_DIR_NAME } from '../../convention.js';
import { NodeCoreCLIManager } from '../../target/node-core-cli/NodeCoreCLIManager.js';
import container from './container.js';
const i18nManager = container.get('I18nManager');
await i18nManager.init();
await container.resolve(NodeCoreCLIManager).handleCommand({
    appsRootPath: container
        .get('FSManager')
        .path('..', '..', APPS_ROOT_DIR_NAME),
    srcImporter: (path) => import(path),
});
