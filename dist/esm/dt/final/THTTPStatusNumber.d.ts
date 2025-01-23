import type { TName } from '../base/TBase.js';
import { TUInt, type TUIntConstraints } from '../base/TUInt.js';
export type HTTPStatusNumber = 100 | 101 | 102 | 103 | 200 | 201 | 202 | 203 | 204 | 205 | 206 | 207 | 208 | 226 | 300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308 | 400 | 401 | 402 | 403 | 404 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 421 | 422 | 423 | 424 | 425 | 426 | 427 | 428 | 429 | 430 | 431 | 451 | 500 | 501 | 502 | 503 | 504 | 505 | 506 | 507 | 508 | 509 | 510 | 511;
export declare class THTTPStatusNumber extends TUInt<HTTPStatusNumber> {
    static readonly OPTIONS: HTTPStatusNumber[];
    constructor(constraints?: TUIntConstraints);
    tName(): TName;
    example(): HTTPStatusNumber;
    onlyNonError(): this;
}
