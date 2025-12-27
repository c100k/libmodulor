#!/usr/bin/env node

import { NodeCoreCLIManager } from '../../../target/node-core-cli/NodeCoreCLIManager.js';
import container from './container.js';
const i18nManager = container.get('I18nManager');
await i18nManager.init();
await container.get(NodeCoreCLIManager).handleCommand({
    srcImporter: (path) => import(path),
});
