import type { FreeTextLong, HTML, HTTPContentType, HTTPMethod, HTTPStatusNumber, JSONString, URL as URLString } from '../dt/index.js';
import type { HTTPRequestBuilder } from '../utils/index.js';
import type { HTTPAPICallerHeaders } from './HTTPAPICaller.js';
import type { Worker } from './Worker.js';
export type HTTPAPICallExecutorAgent = {
    destroy(): void;
};
export interface HTTPAPICallExecutorAgentBuilderInput {
    url: URL;
}
export type HTTPAPICallExecutorAgentBuilderOutput = HTTPAPICallExecutorAgent | undefined;
export interface HTTPAPICallExecutorAgentBuilder extends Worker<HTTPAPICallExecutorAgentBuilderInput, HTTPAPICallExecutorAgentBuilderOutput> {
}
export type HTTPAPICallExecutorFunc<Res> = (url: URL | URLString, info?: {
    agent?: HTTPAPICallExecutorAgent | undefined;
    body?: Awaited<ReturnType<HTTPRequestBuilder['exec']>>['body'];
    headers?: HTTPAPICallerHeaders;
    method?: HTTPMethod;
    signal?: AbortController['signal'];
}) => Promise<HTTPAPICallExecutorResponse<Res>>;
export interface HTTPAPICallExecutorResBody {
    getReader(): {
        read: () => Promise<{
            done: boolean;
            value: Uint8Array;
        }>;
    };
    readable: boolean;
}
export interface HTTPAPICallExecutorResHeaders {
    entries(): IterableIterator<[string, string]>;
    get: (name: 'Content-Type') => HTTPContentType;
}
export interface HTTPAPICallExecutorResponse<Res> {
    arrayBuffer(): Promise<Buffer>;
    body: HTTPAPICallExecutorResBody | undefined;
    headers: HTTPAPICallExecutorResHeaders;
    json: () => Promise<Res>;
    ok: boolean;
    redirected: boolean;
    status: HTTPStatusNumber;
    text: () => Promise<FreeTextLong | HTML | JSONString>;
}
export interface HTTPAPICallExecutor {
    fn<Res>(): HTTPAPICallExecutorFunc<Res>;
}
