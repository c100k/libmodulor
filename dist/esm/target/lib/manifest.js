export const TARGETS = {
    'edge-worker-hono-server': 'edge-worker-hono-server',
    'nextjs-server': 'nextjs-server',
    'node-core-cli': 'node-core-cli',
    'node-core-http-server': 'node-core-http-server',
    'node-express-server': 'node-express-server',
    'node-hono-server': 'node-hono-server',
    'node-mcp-server-stdio': 'node-mcp-server-stdio',
    'node-stricli-cli': 'node-stricli-cli',
    'react-native-pure': 'react-native-pure',
    'react-web-pure': 'react-web-pure',
};
export const TargetCapability = {
    FULL: 'FULL',
    NOT_APPLICABLE: 'NOT_APPLICABLE',
    PARTIAL: 'PARTIAL',
    TODO: 'TODO',
};
export const TARGET_CAPABILITIES_SAMPLE = {
    authBasic: TargetCapability.FULL,
    authJWT: TargetCapability.FULL,
    authPrivKey: TargetCapability.FULL,
    authPubKey: TargetCapability.FULL,
    i18n: TargetCapability.FULL,
    mcp: TargetCapability.FULL,
    mcpOAuth: TargetCapability.FULL,
    openapiSpec: TargetCapability.FULL,
    streaming: TargetCapability.FULL,
    ucAutoMounting: TargetCapability.FULL,
    ucClientConfirm: TargetCapability.FULL,
    ucInputFile: TargetCapability.FULL,
    ucValidation: TargetCapability.FULL,
};
