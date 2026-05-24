import type { RequestHandlerExtra } from '@modelcontextprotocol/sdk/shared/protocol.js';
import type { ServerNotification, ServerRequest } from '@modelcontextprotocol/sdk/types.js';
import type { TransportType } from '../../../../dt/index.js';
import type { Logger } from '../../../../std/index.js';
import type { UCManagerExecServerOpts, UCOPIBase } from '../../../../uc/index.js';
export declare function ucStreamExecOpts<OPI0 extends UCOPIBase | undefined = undefined, OPI1 extends UCOPIBase | undefined = undefined>(logger: Logger, transportType: TransportType, extra: RequestHandlerExtra<ServerRequest, ServerNotification>): UCManagerExecServerOpts<OPI0, OPI1> | undefined;
