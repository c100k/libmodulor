import type { Settings } from '../../../std/index.js';
export interface GRPCServerManagerSettings extends Settings {
    server_grpc_expose_reflection: boolean;
}
