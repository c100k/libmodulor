import { Container } from 'inversify';
import { TApiKey, TPassword, TUsername, } from '../../dt/index.js';
import { STD_DEFAULT_JWT_MANAGER_SETTINGS, } from '../../std/index.js';
import { TARGET_DEFAULT_SERVER_MANAGER_SETTINGS } from '../../target/lib/server/consts.js';
import { NodeExpressServerManager } from '../../target/node-express-server/NodeExpressServerManager.js';
import { FAKE_USER_ADMIN, FAKE_USER_REGULAR } from '../../uc/index.js';
import { CONTAINER_OPTS } from '../../utils/index.js';
import { bindCommon, updateSettings } from '../../utils/ioc/bindCommon.js';
import { bindNodeCore } from '../../utils/ioc/bindNodeCore.js';
import { bindServer } from '../../utils/ioc/bindServer.js';
import { AppTester } from '../AppTester.js';
import { optsAllSet } from '../opts.js';
import { SimpleAppDocsEmitter } from './SimpleAppDocsEmitter/SimpleAppDocsEmitter.js';
import { TypeScriptLibUCDefASTParser } from './TypeScriptLibUCDefASTParser.js';
export async function newNodeAppTester(serverPortRangeStart, idx, args) {
    const { configurator } = args;
    const { logger_level } = optsAllSet(await configurator.opts());
    const settings = {
        ...STD_DEFAULT_JWT_MANAGER_SETTINGS,
        ...TARGET_DEFAULT_SERVER_MANAGER_SETTINGS,
        jwt_manager_secret: new TPassword().example(),
        logger_level,
        server_basic_auth_entries: {
            [new TUsername().example()]: new TPassword().example(),
        },
        server_binding_port: serverPortRangeStart + idx,
        server_private_api_key_entries: [new TApiKey().example()],
        server_public_api_key_entries: [new TApiKey().example()],
        server_stop_mode: 'aggressive',
    };
    const container = new Container(CONTAINER_OPTS);
    bindCommon(container);
    updateSettings(container, settings);
    bindNodeCore(container);
    bindServer(container);
    container.bind('AppDocsEmitter').to(SimpleAppDocsEmitter);
    container
        .bind('ServerManager')
        .to(NodeExpressServerManager)
        .inSingletonScope();
    container
        .bind('UCDefASTParser')
        .to(TypeScriptLibUCDefASTParser);
    const tester = container.get(AppTester);
    const jwtManager = container.get('JWTManager');
    const apiKey = settings.server_private_api_key_entries[0];
    const [basicAuth] = Object.entries(settings.server_basic_auth_entries);
    const basic = basicAuth
        ? { password: basicAuth[1], username: basicAuth[0] }
        : undefined;
    await tester.init({
        ...args,
        serverClientSettings: {
            server_cookies_name_auth: settings.server_cookies_name_auth,
            server_dangerously_set_api_key: apiKey,
            server_dangerously_set_basic: basic,
            server_dangerously_set_jwts: {
                admin: await jwtManager.encode(FAKE_USER_ADMIN),
                regular: await jwtManager.encode(FAKE_USER_REGULAR),
            },
            server_public_api_key: settings.server_public_api_key_entries[0] || null,
            server_public_api_key_header_name: settings.server_public_api_key_header_name,
            server_public_url: `http://${settings.server_binding_host}:${settings.server_binding_port}`,
        },
    });
    return tester;
}
