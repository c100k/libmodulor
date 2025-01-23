import type { HTML, JSONString, URL as URLString } from '../../dt/index.js';
import type { HTTPAPICallExecutor, HTTPAPICallExecutorFunc } from '../HTTPAPICallExecutor.js';
import { FetchHTTPAPICallExecutor } from './FetchHTTPAPICallExecutor.js';
export declare class FakeHTTPAPICallExecutor implements HTTPAPICallExecutor {
    private fetchHTTPAPICallExecutor;
    entries: Map<URL | URLString, HTML | JSONString>;
    constructor(fetchHTTPAPICallExecutor: FetchHTTPAPICallExecutor);
    fn<Res>(): HTTPAPICallExecutorFunc<Res>;
}
