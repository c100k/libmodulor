import { APPS_ROOT_DIR_NAME, type FSManager } from 'libmodulor';
import { NodeCoreCLIManager } from 'libmodulor/node';

import container from './container.js';

await container.get(NodeCoreCLIManager).handleCommand({
    appsRootPath: container
        .get<FSManager>('FSManager')
        .path('..', '..', '..', APPS_ROOT_DIR_NAME),
    srcImporter: (path) => import(path),
});
