import { HTTPRequestBuilder, NDJSONStreamManager, SSEStreamManager } from '../../utils/index.js';
import type { BufferManager } from '../BufferManager.js';
import type { HTTPAPICallExecutor, HTTPAPICallExecutorAgentBuilder } from '../HTTPAPICallExecutor.js';
import type { HTTPAPICaller, HTTPAPICallerInput } from '../HTTPAPICaller.js';
import type { Logger } from '../Logger.js';
import type { XMLManager } from '../XMLManager.js';
export declare class SimpleHTTPAPICaller implements HTTPAPICaller {
    private bufferManager;
    private httpAPICallExecutor;
    private httpAPICallExecutorAgentBuilder;
    private httpRequestBuilder;
    private logger;
    private ndJSONStreamManager;
    private sseStreamManager;
    private xmlManager;
    constructor(bufferManager: BufferManager, httpAPICallExecutor: HTTPAPICallExecutor, httpAPICallExecutorAgentBuilder: HTTPAPICallExecutorAgentBuilder, httpRequestBuilder: HTTPRequestBuilder, logger: Logger, ndJSONStreamManager: NDJSONStreamManager, sseStreamManager: SSEStreamManager, xmlManager: XMLManager);
    exec<AH extends object | undefined, Req extends object, ResBad, ResGood, O>({ additionalHeadersBuilder, authorizationHeader, basicAuth, contentType, errBuilder, method, onPartialOutput, opts, outputBuilder, req, urlBuilder, unknownErrorMessage, }: HTTPAPICallerInput<AH, Req, ResBad, ResGood, O>): Promise<O>;
    private computeHeaders;
    private processResBad;
    private processResGood;
}
