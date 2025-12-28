import { PRODUCT_I18N_FILE_NAME, PRODUCT_I18N_NAME, PRODUCT_MANIFEST_FILE_NAME, PRODUCT_MANIFEST_NAME, } from '../../../../../convention.js';
import { LIB_NAME } from '../consts.js';
import { fileImportName } from '../funcs.js';
const COMMON_CONTAINER_IMPORTS = `import { ${PRODUCT_I18N_NAME} } from '../${fileImportName(PRODUCT_I18N_FILE_NAME)}';
import { ${PRODUCT_MANIFEST_NAME} } from '../${fileImportName(PRODUCT_MANIFEST_FILE_NAME)}';
import { type S, settings } from './settings.js';`;
const NODE_CORE_CLI_CONTAINER_TS = `import { Container } from 'inversify';
import {
    bindCommon,
    bindProduct,
    CONTAINER_OPTS,
    updateSettings,
} from '${LIB_NAME}';
import { bindNodeCLI, bindNodeCore } from '${LIB_NAME}/node';

${COMMON_CONTAINER_IMPORTS}

const container = new Container(CONTAINER_OPTS);

bindCommon(container);
updateSettings<S>(container, settings);
bindNodeCore(container);
bindNodeCLI(container);
bindProduct(container, Manifest, I18n);

export default container;
`;
const NODE_CORE_CLI_INDEX_TS = `import { NodeCoreCLIManager } from '${LIB_NAME}/node';

import container from './container.js';

await container.get(NodeCoreCLIManager).handleCommand({
    srcImporter: (path) => import(path),
});
`;
const NODE_CORE_CLI_SETTINGS_TS = `import {
    type ServerClientManagerSettings,
    TARGET_DEFAULT_SERVER_CLIENT_MANAGER_SETTINGS,
} from '${LIB_NAME}';

export type S = ServerClientManagerSettings;

export const settings: S = {
    ...TARGET_DEFAULT_SERVER_CLIENT_MANAGER_SETTINGS,
};
`;
const NODE_EXPRESS_SERVER_CONTAINER_TS = `import { Container } from 'inversify';
import {
    bindCommon,
    bindProduct,
    CONTAINER_OPTS,
    type ServerManager,
    updateSettings,
} from '${LIB_NAME}';
import { bindNodeCore } from '${LIB_NAME}/node';
import {
    bindServer,
    NodeExpressServerManager,
} from '${LIB_NAME}/node-express';

${COMMON_CONTAINER_IMPORTS}

const container = new Container(CONTAINER_OPTS);

bindCommon(container);
updateSettings<S>(container, settings);
bindNodeCore(container);
bindServer(container);
bindProduct(container, ${PRODUCT_MANIFEST_NAME}, ${PRODUCT_I18N_NAME});

container.bind<ServerManager>('ServerManager').to(NodeExpressServerManager);

export default container;
`;
const NODE_HONO_SERVER_CONTAINER_TS = `import { Container } from 'inversify';
import {
    bindCommon,
    bindProduct,
    CONTAINER_OPTS,
    type ServerManager,
    updateSettings,
} from '${LIB_NAME}';
import { bindNodeCore } from '${LIB_NAME}/node';
import {
    bindServer,
    NodeHonoServerManager,
} from '${LIB_NAME}/node-hono';

${COMMON_CONTAINER_IMPORTS}

const container = new Container(CONTAINER_OPTS);

bindCommon(container);
updateSettings<S>(container, settings);
bindNodeCore(container);
bindServer(container);
bindProduct(container, ${PRODUCT_MANIFEST_NAME}, ${PRODUCT_I18N_NAME});

container.bind<ServerManager>('ServerManager').to(NodeHonoServerManager);

export default container;
`;
const NODE_MCP_SERVER_CONTAINER_TS = `import { Container } from 'inversify';
import {
    bindCommon,
    bindProduct,
    CONTAINER_OPTS,
    type ServerManager,
    updateSettings,
} from '${LIB_NAME}';
import { bindNodeCore } from '${LIB_NAME}/node';
import { NodeLocalStdioMCPServerManager } from '${LIB_NAME}/node-mcp';

${COMMON_CONTAINER_IMPORTS}

const container = new Container(CONTAINER_OPTS);

bindCommon(container);
updateSettings<S>(container, settings);
bindNodeCore(container);
bindProduct(container, Manifest, I18n);

container
    .bind<ServerManager>('ServerManager')
    .to(NodeLocalStdioMCPServerManager);

export default container;
`;
const NODE_MCP_SERVER_INDEX_TS = `import { MCPServerBooter } from '${LIB_NAME}/node-mcp';

import container from './container.js';

await container.get(MCPServerBooter).exec({
    srcImporter: (path) => import(path),
});
`;
const NODE_MCP_SERVER_SETTINGS_TS = `import {
    type LoggerSettings,
    type ServerManagerSettings,
    TARGET_DEFAULT_SERVER_MANAGER_SETTINGS,
} from '${LIB_NAME}';

export type S = LoggerSettings & ServerManagerSettings;

export const settings: S = {
    ...TARGET_DEFAULT_SERVER_MANAGER_SETTINGS,
    logger_level: 'error',
};
`;
const SERVER_SETTINGS_TS = `import {
    type JWTManagerSettings,
    type ServerManagerSettings,
    STD_DEFAULT_JWT_MANAGER_SETTINGS,
    TARGET_DEFAULT_SERVER_MANAGER_SETTINGS,
} from '${LIB_NAME}';

export type S = JWTManagerSettings & ServerManagerSettings;

export const settings: S = {
    ...TARGET_DEFAULT_SERVER_MANAGER_SETTINGS,
    ...STD_DEFAULT_JWT_MANAGER_SETTINGS,
};
`;
const SERVER_INDEX_TS = `import { ServerBooter } from '${LIB_NAME}';

import container from './container.js';

await container.get(ServerBooter).exec({
    srcImporter: (path) => import(path),
});
`;
const MAPPING = {
    'edge-worker-hono-server': new Map(),
    'nextjs-server': new Map(),
    'node-core-cli': new Map([
        [['.', 'container.ts'], NODE_CORE_CLI_CONTAINER_TS],
        [['.', 'index.ts'], NODE_CORE_CLI_INDEX_TS],
        [['.', 'settings.ts'], NODE_CORE_CLI_SETTINGS_TS],
    ]),
    'node-express-server': new Map([
        [['.', 'container.ts'], NODE_EXPRESS_SERVER_CONTAINER_TS],
        [['.', 'index.ts'], SERVER_INDEX_TS],
        [['.', 'settings.ts'], SERVER_SETTINGS_TS],
    ]),
    'node-hono-server': new Map([
        [['.', 'container.ts'], NODE_HONO_SERVER_CONTAINER_TS],
        [['.', 'index.ts'], SERVER_INDEX_TS],
        [['.', 'settings.ts'], SERVER_SETTINGS_TS],
    ]),
    'node-mcp-server': new Map([
        [['.', 'container.ts'], NODE_MCP_SERVER_CONTAINER_TS],
        [['.', 'index.ts'], NODE_MCP_SERVER_INDEX_TS],
        [['.', 'settings.ts'], NODE_MCP_SERVER_SETTINGS_TS],
    ]),
    'node-stricli-cli': new Map(),
    'react-native-pure': new Map(),
    'react-web-pure': new Map(),
};
export function files(name) {
    return MAPPING[name];
}
