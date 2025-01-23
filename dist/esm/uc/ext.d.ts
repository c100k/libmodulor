import type { HTTPMethod, URLPath } from '../dt/index.js';
import type { UCOPIBase } from './opi.js';
import type { UCOutput } from './output.js';
import type { UCMountingPoint } from './utils/ucMountingPoint.js';
export type UCHTTPMountingPoint = `/${URLPath}`;
export interface UCExt<OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> {
    cmd?: {
        mountAt?: UCMountingPoint;
    };
    http?: {
        method?: HTTPMethod;
        mountAt?: UCHTTPMountingPoint;
        mountAlsoAt?: UCHTTPMountingPoint[];
        transform?: <T extends object>(output: UCOutput<OPI0, OPI1>) => T;
    };
}
