import type { RequestListener } from 'node:http';
import type { HTTPMethod, URLPath } from '../../../dt/index.js';
export type RouteKey = `${HTTPMethod}_${URLPath}` | (string & {});
export type Router = Record<RouteKey, RequestListener>;
