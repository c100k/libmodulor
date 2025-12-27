import { NodeCoreCLIManager } from '../../../../dist/esm/index.node.js';
import container from './container.js';

await container.get(NodeCoreCLIManager).handleCommand({
    srcImporter: (path) => import(path),
});
