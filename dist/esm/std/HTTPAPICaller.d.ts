import type { ApiKey, ErrorMessage, HTTPContentType, HTTPMethod, JWT, Password, URL, Username } from '../dt/index.js';
import type { HTTPDataEnvelope, RegisterAbortFunc } from '../utils/index.js';
import type { XMLManagerParseOpts } from './XMLManager.js';
type AdditionalHeadersBuilder<AH> = () => Promise<AH>;
type ErrBuilder<ResBad> = (response: ResBad) => Promise<ErrorMessage>;
type OutputBuilder<ResGood, O> = (response: ResGood) => Promise<O>;
type ReqBuilder<Req extends object> = () => Promise<Req>;
type URLBuilder = () => Promise<URL>;
export interface HTTPAPICallerHeaders {
    [key: string]: string | undefined;
    Authorization?: HTTPAPICallerAuthorizationHeader['value'];
    'Content-Type'?: HTTPContentType;
    Cookie?: string;
}
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
    /**
     * They are the last ones to be set so they will override any other header already set by `authorizationHeader` or `basicAuth` if any.
     */
    additionalHeadersBuilder?: AdditionalHeadersBuilder<AH> | undefined;
    authorizationHeader?: HTTPAPICallerAuthorizationHeader | undefined;
    basicAuth?: HTTPAPICallerBasicAuth | undefined;
    /**
     * @default application/json
     */
    contentType?: HTTPContentType;
    errBuilder: ErrBuilder<ResBad>;
    method: HTTPMethod;
    opts?: HTTPAPICallerInputOpts | undefined;
    /**
     * If not set, it will assume that `ResGood` and `O` are the same and thus return `ResGood` as is.
     */
    outputBuilder?: OutputBuilder<ResGood, O> | undefined;
    registerAbort?: RegisterAbortFunc | undefined;
    req?: {
        builder: ReqBuilder<Req>;
        envelope: HTTPDataEnvelope;
    } | undefined;
    stream?: {
        onData: (res: O) => void;
    } | undefined;
    unknownErrorMessage?: ErrorMessage | undefined;
    urlBuilder: URLBuilder;
}
export interface HTTPAPICaller {
    exec<AH extends object | undefined, Req extends object, ResBad, ResGood, O>(input: HTTPAPICallerInput<AH, Req, ResBad, ResGood, O>): Promise<O>;
}
export {};
