import { APPS_ROOT_DIR_NAME, type FSManager, ServerBooter } from 'libmodulor';

import container from './container.js';

await container.get(ServerBooter).exec({
    appsRootPath: container
        .get<FSManager>('FSManager')
        .path('..', '..', '..', APPS_ROOT_DIR_NAME),
    srcImporter: (path) => import(path),
});
