import type { TName } from '../base/TBase.js';
import { TString } from '../base/TString.js';
import type { RNInputMode } from '../targets/rn.js';
import type { HTMLInputType } from '../targets/web.js';
interface TSearchQueryConfig<H extends object = object> {
    hitToString: (hit: H) => SearchQuery;
    indexName: string;
}
export type SearchQuery = string;
export declare class TSearchQuery extends TString<SearchQuery> {
    private config;
    tName(): TName;
    configure<H extends object = object>(config: TSearchQueryConfig<H>): this;
    example(): SearchQuery;
    getConfig<H extends object = object>(): TSearchQueryConfig<H> | undefined;
    htmlInputType(): HTMLInputType;
    rnInputMode(): RNInputMode;
}
export {};
