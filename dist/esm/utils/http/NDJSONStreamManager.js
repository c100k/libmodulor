var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NDJSONStreamManager_1;
import { injectable } from 'inversify';
import { NDJSON_DATA_SEP } from './nd-json.js';
let NDJSONStreamManager = class NDJSONStreamManager {
    static { NDJSONStreamManager_1 = this; }
    static DEFAULT_ENCODING = 'utf-8';
    async exec({ abortController, encoding = NDJSONStreamManager_1.DEFAULT_ENCODING, onData, reader, }) {
        const decoder = new TextDecoder(encoding);
        let buffer = '';
        while (true) {
            if (abortController.signal.aborted) {
                return;
            }
            const { done, value } = await reader.read();
            if (done) {
                return;
            }
            buffer += decoder.decode(value, { stream: true });
            const parts = buffer.split(NDJSON_DATA_SEP);
            // Remove the last part that is potentially not complete yet.
            buffer = parts.pop() ?? '';
            for (const part of parts) {
                const lines = part.split(NDJSON_DATA_SEP);
                for (const line of lines) {
                    try {
                        onData(JSON.parse(line));
                    }
                    catch (_err) {
                        // Ignore invalid message
                    }
                }
            }
        }
    }
};
NDJSONStreamManager = NDJSONStreamManager_1 = __decorate([
    injectable()
], NDJSONStreamManager);
export { NDJSONStreamManager };
