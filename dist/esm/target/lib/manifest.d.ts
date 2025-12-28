import type { EnumOf } from '../../utils/index.js';
export declare const TARGETS: {
    readonly 'edge-worker-hono-server': "edge-worker-hono-server";
    readonly 'nextjs-server': "nextjs-server";
    readonly 'node-core-cli': "node-core-cli";
    readonly 'node-express-server': "node-express-server";
    readonly 'node-hono-server': "node-hono-server";
    readonly 'node-mcp-server': "node-mcp-server";
    readonly 'node-stricli-cli': "node-stricli-cli";
    readonly 'react-native-pure': "react-native-pure";
    readonly 'react-web-pure': "react-web-pure";
};
export type TargetName = EnumOf<typeof TARGETS>;
