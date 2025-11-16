import {
    APPS_ROOT_DIR_NAME,
    type FSManager,
} from '../../../../dist/esm/index.js';
import { NodeCoreCLIManager } from '../../../../dist/esm/index.node.js';
import container from './container.js';

await container.get(NodeCoreCLIManager).handleCommand({
    appsRootPath: container
        .get<FSManager>('FSManager')
        .path('..', '..', '..', APPS_ROOT_DIR_NAME),
    srcImporter: (path) => import(path),
});
