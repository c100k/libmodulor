import type { XMLManager, XMLManagerParseOpts, XMLManagerRawXML } from '../XMLManager.js';
export declare class NoopXMLManager implements XMLManager {
    parse<T>(_xml: XMLManagerRawXML, _opts?: XMLManagerParseOpts): Promise<T>;
}
