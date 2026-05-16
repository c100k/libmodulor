import type { FreeTextLong, FreeTextShort, HTTPMethod, HTTPStatusNumber, JSONSchemaObject, JSONSchemaProperty, SemVerVersion, URL } from '../../../dt/index.js';
import type { ProductName } from '../../../product/index.js';
import type { FQUCInputName, FQUCOPI0Name, FQUCOPI1Name, UCFieldKey } from '../../../uc/index.js';
import type { AUTHORIZATION_HEADER_NAME, AuthCookieName, PublicApiKeyHeaderName } from '../shared.js';
export type OpenAPIPathName = string;
export type OpenAPIDescription = FreeTextLong;
export type OpenAPISchemaName = FQUCInputName | FQUCOPI0Name | FQUCOPI1Name | `Error`;
export type OpenAPISchemaRef = `#/components/schemas/${OpenAPISchemaName}`;
export type OpenAPISummary = FreeTextShort;
export type OpenAPISecurityItem = Partial<Record<keyof OpenAPISecuritySchemes, []>>;
export type OpenAPISecurity = OpenAPISecurityItem[];
export interface OpenAPISecurityScheme {
    description?: OpenAPIDescription;
}
export interface OpenAPISecuritySchemes {
    apiKey?: OpenAPISecurityScheme & {
        bearerFormat: 'Bearer';
        in: 'header';
        name: typeof AUTHORIZATION_HEADER_NAME;
        type: 'apiKey';
    };
    basic?: OpenAPISecurityScheme & {
        scheme: 'basic';
        type: 'http';
    };
    jwt?: OpenAPISecurityScheme & {
        in: 'cookie';
        name: AuthCookieName;
        type: 'apiKey';
    };
    publicApiKey?: OpenAPISecurityScheme & {
        in: 'header';
        name: PublicApiKeyHeaderName;
        type: 'apiKey';
    };
}
export interface OpenAPIComponents {
    securitySchemes: OpenAPISecuritySchemes;
    schemas: Record<OpenAPISchemaName, JSONSchemaObject<any>>;
}
export interface OpenAPIParameter {
    description?: OpenAPIDescription;
    in: 'path' | 'query';
    name: UCFieldKey;
    required: boolean;
    schema: JSONSchemaProperty<any>;
}
export interface OpenAPIPath {
    description?: OpenAPIDescription;
    parameters?: OpenAPIParameter[];
    requestBody?: OpenAPIRequestBody;
    responses: OpenAPIResponses;
    security?: OpenAPISecurity;
    summary?: OpenAPISummary;
    tags?: string[];
}
export interface OpenAPIInnerContent {
    schema: {
        $ref: OpenAPISchemaRef;
    } | JSONSchemaObject<any>;
}
export type OpenAPIContent = {
    'application/json': OpenAPIInnerContent;
} | {
    'multipart/form-data': OpenAPIInnerContent & {
        encoding?: Record<UCFieldKey, {
            style: 'form';
            explode: boolean;
        }>;
    };
};
export interface OpenAPIRequestBody {
    content: OpenAPIContent;
    description?: OpenAPIDescription;
    required: boolean;
}
export type OpenAPIPaths = Record<OpenAPIPathName, Partial<Record<Lowercase<HTTPMethod>, OpenAPIPath>>>;
export interface OpenAPIResponse {
    content?: OpenAPIContent;
    description: OpenAPIDescription;
}
export type OpenAPIResponses = Partial<Record<HTTPStatusNumber, OpenAPIResponse>>;
export interface OpenAPIServer {
    description?: OpenAPIDescription;
    url: URL;
}
export interface OpenAPISpec {
    components: OpenAPIComponents;
    info: {
        description?: OpenAPIDescription;
        title: ProductName;
        summary?: OpenAPISummary;
        version: SemVerVersion;
    };
    openapi: '3.1.0';
    paths: OpenAPIPaths;
    servers: OpenAPIServer[];
}
