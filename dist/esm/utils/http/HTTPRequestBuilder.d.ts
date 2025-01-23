import type { URL as URLString } from '../../dt/index.js';
import type { FormDataBuilder, Worker } from '../../std/index.js';
import type { HTTPDataEnvelope, HTTPReqData } from './types.js';
export interface Input {
    baseURL: URLString;
    data: HTTPReqData;
    envelope: HTTPDataEnvelope;
}
export interface Output {
    body: BodyInit | null;
    url: URLString;
}
export declare class HTTPRequestBuilder implements Worker<Input, Promise<Output>> {
    private formDataBuilder;
    constructor(formDataBuilder: FormDataBuilder);
    exec({ baseURL, data, envelope }: Input): Promise<Output>;
}
