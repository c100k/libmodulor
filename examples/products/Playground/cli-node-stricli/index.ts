import {
    APPS_ROOT_DIR_NAME,
    type FSManager,
} from '../../../../dist/esm/index.js';
import { NodeStricliCLIManager } from '../../../../dist/esm/index.node-stricli-cli.js';
import container from './container.js';

await container.get(NodeStricliCLIManager).handleCommand({
    appsRootPath: container
        .get<FSManager>('FSManager')
        .path('..', '..', '..', APPS_ROOT_DIR_NAME),
    srcImporter: (path) => import(path),
});
