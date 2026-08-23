import type { HTTPMethod, TransportType, URL, URLPath } from '../dt/index.js';
import type { UCMountingPoint } from './utils/ucMountingPoint.js';
export type UCHTTPMountingPoint = `/${URLPath}`;
export interface UCExt {
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
         * Some use cases produce an output that must conform to an external specification.
         * When this property is set (the URL is simply for documentation purposes), the server
         * does not return the usual `UCOutput`. Instead, it returns the response defined by
         * the referenced specification.
         *
         * @example OAuth2 https://datatracker.ietf.org/doc/html/rfc8414#section-2
         * @example RebootXOnPrem https://github.com/c100k/rebootx-on-prem
         */
        externalSpecResponse?: URL;
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
    };
    transport?: {
        /**
         * The way the output is transported
         *
         * By default, it's `standard`.
         */
        type?: TransportType;
    };
}
export declare function ucTransportType(ext?: UCExt | undefined): TransportType;
