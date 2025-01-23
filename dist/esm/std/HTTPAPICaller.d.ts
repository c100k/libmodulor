import type { ApiKey, ErrorMessage, HTTPContentType, HTTPMethod, JWT, Password, URL, Username } from '../dt/index.js';
import type { HTTPDataEnvelope } from '../utils/index.js';
import type { XMLManagerParseOpts } from './XMLManager.js';
type AdditionalHeadersBuilder<AH> = () => Promise<AH>;
type ErrBuilder<ResBad> = (response: ResBad) => Promise<ErrorMessage>;
type OutputBuilder<ResGood, O> = (response: ResGood) => Promise<O>;
type ReqBuilder<Req extends object> = () => Promise<Req>;
type URLBuilder = () => Promise<URL>;
export interface HTTPAPICallerAuthorizationHeader {
    prefix?: 'AWS4-HMAC-SHA256' | 'Basic' | 'Bearer' | 'JWT' | 'OAuth';
    value: ApiKey | JWT | Password;
}
export interface HTTPAPICallerBasicAuth {
    password: Password;
    username: Username;
}
export interface HTTPAPICallerInputOpts {
    xml?: XMLManagerParseOpts;
}
export interface HTTPAPICallerInput<AH extends object | undefined, Req extends object, ResBad, ResGood, O> {
    additionalHeadersBuilder?: AdditionalHeadersBuilder<AH> | undefined;
    authorizationHeader?: HTTPAPICallerAuthorizationHeader | undefined;
    basicAuth?: HTTPAPICallerBasicAuth | undefined;
    contentType?: HTTPContentType;
    errBuilder: ErrBuilder<ResBad>;
    method: HTTPMethod;
    opts?: HTTPAPICallerInputOpts | undefined;
    outputBuilder?: OutputBuilder<ResGood, O> | undefined;
    req?: {
        builder: ReqBuilder<Req>;
        envelope: HTTPDataEnvelope;
    } | undefined;
    unknownErrorMessage?: ErrorMessage | undefined;
    urlBuilder: URLBuilder;
}
export interface HTTPAPICaller {
    exec<AH extends object | undefined, Req extends object, ResBad, ResGood, O>(input: HTTPAPICallerInput<AH, Req, ResBad, ResGood, O>): Promise<O>;
}
export {};
