import type { UC_DEF_SUFFIX } from '../convention.js';
import type { UCClientDef } from './client.js';
import type { UCExt } from './ext.js';
import type { UCInput, UCInputDef } from './input.js';
import type { UCMetadata, UCName } from './metadata.js';
import type { UCOPIBase } from './opi.js';
import type { UCOutputDef } from './output.js';
import type { UCSec } from './sec.js';
import type { UCServerDef } from './server.js';
export type UCDefSource = any;
export type UCDefSourceRaw = string;
export type UCDefSourceSafe<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> = {
    [key: `${UCName}${typeof UC_DEF_SUFFIX}`]: UCDef<I, OPI0, OPI1>;
};
export type UCDefLifecycle = 'client' | 'server';
export interface UCDef<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> {
    ext?: UCExt<OPI0, OPI1>;
    io: {
        i?: UCInputDef<NonNullable<I>>;
        o?: UCOutputDef<OPI0, OPI1>;
    };
    lifecycle: {
        client?: UCClientDef<I, OPI0, OPI1>;
        server?: UCServerDef<I, OPI0, OPI1> | true;
    };
    metadata: UCMetadata;
    sec?: UCSec;
}
export interface UCWording {
    desc: string | null;
    label: string;
}
export type UCFieldKey = string;
