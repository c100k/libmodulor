import type { ErrorMessage, JSONSchemaObject } from '../../../dt/index.js';
import { type ServerError } from '../../../error/index.js';
export declare function serverErrorJsonSchema(message?: ErrorMessage): JSONSchemaObject<ServerError>;
