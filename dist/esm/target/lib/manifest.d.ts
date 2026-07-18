import type { UCDefLifecycle } from '../../uc/index.js';
import type { EnumOf } from '../../utils/index.js';
export declare const TARGETS: {
    readonly 'edge-worker-hono-server': "edge-worker-hono-server";
    readonly 'nextjs-server': "nextjs-server";
    readonly 'node-core-cli': "node-core-cli";
    readonly 'node-core-http-server': "node-core-http-server";
    readonly 'node-express-server': "node-express-server";
    readonly 'node-hono-server': "node-hono-server";
    readonly 'node-mcp-server-stdio': "node-mcp-server-stdio";
    readonly 'node-stricli-cli': "node-stricli-cli";
    readonly 'react-native-pure': "react-native-pure";
    readonly 'react-web-pure': "react-web-pure";
};
export type TargetName = EnumOf<typeof TARGETS>;
export declare const TargetCapability: {
    readonly FULL: "FULL";
    readonly NOT_APPLICABLE: "NOT_APPLICABLE";
    readonly PARTIAL: "PARTIAL";
    readonly TODO: "TODO";
};
export type TargetCapability = EnumOf<typeof TargetCapability>;
export interface TargetCapabilities {
    authBasic: TargetCapability;
    authJWT: TargetCapability;
    authPrivKey: TargetCapability;
    authPubKey: TargetCapability;
    i18n: TargetCapability;
    mcp: TargetCapability;
    mcpOAuth: TargetCapability;
    openapiSpec: TargetCapability;
    streaming: TargetCapability;
    ucAutoMounting: TargetCapability;
    ucClientConfirm: TargetCapability;
    ucInputFile: TargetCapability;
    ucValidation: TargetCapability;
}
export declare const TARGET_CAPABILITIES_SAMPLE: TargetCapabilities;
export interface TargetDef {
    lifecycle: UCDefLifecycle;
    capabilities: TargetCapabilities;
}
export interface TargetDefSrc {
    DEF: TargetDef;
}
