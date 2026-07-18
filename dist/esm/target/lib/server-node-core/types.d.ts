import type { RequestListener } from 'node:http';
import type { UCHTTPContract } from '../../../uc/index.js';
export type RouteKey = `${UCHTTPContract['method']}_${UCHTTPContract['path']}`;
export type Router = Record<RouteKey, RequestListener>;
