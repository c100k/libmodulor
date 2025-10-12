import type { HTTPMethod, TransportType, URLPath } from '../dt/index.js';
import type { UCOPIBase } from './opi.js';
import type { UCOutput } from './output.js';
import type { UCMountingPoint } from './utils/ucMountingPoint.js';
export type UCHTTPMountingPoint = `/${URLPath}`;
export interface UCExt<OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined> {
    cmd?: {
        /**
         * The command on which the use case is mounted at
         *
         * By default, it's mounted at `${fqucn}`.
         */
        mountAt?: UCMountingPoint;
    };
    http?: {
        /**
         * The verb on which the use case is mounted at
         *
         * By default, it's computed from the {@link UCMetadata.action} with some specific heuristics.
         *
         * For instance, you can set `POST` even for a `List` use case, which usually defaults to `GET`.
         * This can be useful in case you want the input to "travel" through the body of the request, and not the query params.
         */
        method?: HTTPMethod;
        /**
         * The path on which the use case should mounted at
         *
         * By default, it's mounted at `/api/v1/${fqucn}`.
         */
        mountAt?: UCHTTPMountingPoint;
        /**
         * The path on which the use case should also mounted at
         *
         * This is typically used when the mounting point is changed and you want to maintain a "legacy" endpoint for clients having
         * a different release cycle than the server (e.g. a mobile app), who are still calling the old endpoint.
         */
        mountAlsoAt?: UCHTTPMountingPoint[];
        /**
         * Transform the output received to fit with some specific cases where the endpoint is expected to respect a certain contract
         * @param output
         * @returns
         */
        transform?: (output: UCOutput<OPI0, OPI1>) => object;
        /**
         * The way the output is transported
         *
         * By default, it's `standard`.
         */
        transportType?: TransportType;
    };
}
