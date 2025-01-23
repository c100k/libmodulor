import type { HTTPAPICallExecutor, HTTPAPICallExecutorFunc } from '../HTTPAPICallExecutor.js';
export declare class FetchHTTPAPICallExecutor implements HTTPAPICallExecutor {
    fn<Res>(): HTTPAPICallExecutorFunc<Res>;
}
