import type { HTTPContentType, HTTPMethod, URLPath } from '../dt/index.js';
import type { HTTPDataEnvelope, RegisterAbortFunc } from '../utils/index.js';
import type { UCInput } from './input.js';
import type { UCMainStream } from './main.js';
import type { UCOPIBase } from './opi.js';
import type { UCOutputOrNothing } from './output.js';
import type { UC } from './UC.js';
import { type UCMountingPoint } from './utils/ucMountingPoint.js';
export declare const UC_TRANSPORT_CONTRACT_DEFAULT_PREFIX = "/api/v1";
export declare const UC_TRANSPORT_CONTRACT_DEFAULT_PREFIX_WITH_DOTS = "api.v1";
export declare const UC_TRANSPORT_CONTRACT_DEFAULT_PREFIX_WITH_DOTS_PARTS: string[];
export interface UCTransporterOpts<OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> {
    registerAbort?: RegisterAbortFunc | undefined;
    stream?: UCMainStream<OPI0, OPI1> | undefined;
}
export interface UCTransporter {
    send<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined>(uc: UC<I, OPI0, OPI1>, opts?: UCTransporterOpts<OPI0, OPI1>): Promise<UCOutputOrNothing<OPI0, OPI1>>;
}
export interface UCTransportContract {
    grpc: {
        path: URLPath;
    };
    http: {
        contentType: HTTPContentType;
        envelope: HTTPDataEnvelope;
        method: HTTPMethod;
        path: URLPath;
        pathAliases: URLPath[];
    };
    mountingPoint: UCMountingPoint;
}
export declare function ucTransportContract<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined>(uc: UC<I, OPI0, OPI1>): UCTransportContract;
