import type { HTTPContentType, HTTPMethod, URLPath } from '../../dt/index.js';
import type { HTTPDataEnvelope } from '../../utils/index.js';
import type { UCInput } from '../input.js';
import type { UCOPIBase } from '../opi.js';
import type { UC } from '../UC.js';
import { type UCMountingPoint } from './ucMountingPoint.js';
export interface UCHTTPContract {
    contentType: HTTPContentType;
    envelope: HTTPDataEnvelope;
    method: HTTPMethod;
    mountingPoint: UCMountingPoint;
    path: URLPath;
    pathAliases: URLPath[];
}
export declare function ucHTTPContract<I extends UCInput | undefined = undefined, OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined>(uc: UC<I, OPI0, OPI1>, pathPrefix?: `/${URLPath}`): UCHTTPContract;
