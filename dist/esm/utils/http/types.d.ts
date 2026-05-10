import type { URL } from '../../dt/index.js';
export type HTTPCSPType = 'defaultSrc' | 'imgSrc' | 'scriptSrc';
export type HTTPCSPValue = URL[];
export type HTTPCookieSameSite = 'lax' | 'none' | 'strict';
export type HTTPDataEnvelope = 'form-data' | 'json' | 'query-params';
export type HTTPReqData = Record<string, unknown>;
export type HTTPHeaderName = 'Accept' | 'Authorization' | 'Content-Type' | 'Cookie' | 'Origin' | 'X-Requested-With' | (string & {});
