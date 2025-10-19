var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var SSEStreamManager_1;
import { injectable } from 'inversify';
import { throwCustomError } from '../../error/index.js';
import { isSSEError, parseDataLine, SSE_DATA_SEP, SSE_MSG_SEP } from './sse.js';
let SSEStreamManager = class SSEStreamManager {
    static { SSEStreamManager_1 = this; }
    static DEFAULT_ENCODING = 'utf-8';
    async exec({ encoding = SSEStreamManager_1.DEFAULT_ENCODING, onData, reader, }) {
        const decoder = new TextDecoder(encoding);
        let buffer = '';
        while (true) {
            const { done, value } = await reader.read();
            if (done) {
                return;
            }
            buffer += decoder.decode(value, { stream: true });
            const parts = buffer.split(SSE_MSG_SEP);
            // Remove the last part that is potentially not complete yet.
            buffer = parts.pop() ?? '';
            for (const part of parts) {
                const lines = part.split(SSE_DATA_SEP);
                let data = '';
                for (const line of lines) {
                    data += parseDataLine(line);
                }
                if (!data) {
                    continue;
                }
                let parsedData;
                try {
                    parsedData = JSON.parse(data);
                }
                catch (_err) {
                    // Ignore invalid message
                    continue;
                }
                if (isSSEError(parsedData)) {
                    const { message, status } = parsedData;
                    throwCustomError(message, status);
                }
                else {
                    onData(parsedData);
                }
            }
        }
    }
};
SSEStreamManager = SSEStreamManager_1 = __decorate([
    injectable()
], SSEStreamManager);
export { SSEStreamManager };
