import { status } from '@grpc/grpc-js';
import type { HTTPStatusNumber } from '../../../dt/index.js';
import type { CustomError } from '../../../error/index.js';
export declare const MAPPING: Map<HTTPStatusNumber, status>;
export declare function errToStatus(err: CustomError): status;
