export type XMLManagerRawXML = string;
export interface XMLManagerParseOpts {
    attributeNamePrefix?: string;
    isArray?: (tagName: string) => boolean;
    isObject?: (tagName: string) => boolean;
}
export interface XMLManager {
    parse<T>(xml: XMLManagerRawXML, opts?: XMLManagerParseOpts): Promise<T>;
}
