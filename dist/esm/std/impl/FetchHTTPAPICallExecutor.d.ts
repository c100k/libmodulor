import type { HTTPAPICallExecutor, HTTPAPICallExecutorFunc } from '../HTTPAPICallExecutor.js';
/**
 * Nowadays, most platforms include it as a global :
 *
 *   - Node : https://nodejs.org/api/globals.html#fetch
 *   - RN   : https://reactnative.dev/docs/network#using-fetch
 *   - Web  : https://developer.mozilla.org/fr/docs/Web/API/Fetch_API
 *
 * So we should be safe using it almost everywhere.
 */
export declare class FetchHTTPAPICallExecutor implements HTTPAPICallExecutor {
    fn<Res>(): HTTPAPICallExecutorFunc<Res>;
}
