#!/usr/bin/env node

import { APPS_ROOT_DIR_NAME } from '../../convention.js';
import { NodeCoreCLIManager } from '../../target/node-core-cli/NodeCoreCLIManager.js';
import container from './container.js';
const i18nManager = container.get('I18nManager');
await i18nManager.init();
// Before screaming, yes, this is not using any powerful CLI library.
// The goal is to reduce the usage of dependencies as much as possible.
// As long as the built-in Node.js API allows to build it without too many workarounds, let's keep it this way.
await container.resolve(NodeCoreCLIManager).handleCommand({
    appsRootPath: container
        .get('FSManager')
        .path('..', '..', APPS_ROOT_DIR_NAME),
    srcImporter: (path) => import(path),
});
