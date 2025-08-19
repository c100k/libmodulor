var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { injectable } from 'inversify';
/**
 * Nowadays, most platforms include it as a global :
 *
 *   - Node : https://nodejs.org/api/globals.html#fetch
 *   - RN   : https://reactnative.dev/docs/network#using-fetch
 *   - Web  : https://developer.mozilla.org/fr/docs/Web/API/Fetch_API
 *
 * So we should be safe using it almost everywhere.
 */
let FetchHTTPAPICallExecutor = class FetchHTTPAPICallExecutor {
    fn() {
        // The generalization in HTTPAPICallExecutor is not exactly the same as the actual implementation
        // @ts-expect-error
        return fetch;
    }
};
FetchHTTPAPICallExecutor = __decorate([
    injectable()
], FetchHTTPAPICallExecutor);
export { FetchHTTPAPICallExecutor };
