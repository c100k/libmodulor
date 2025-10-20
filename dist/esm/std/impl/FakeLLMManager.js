var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { injectable } from 'inversify';
let FakeLLMManager = class FakeLLMManager {
    async send(req, opts) {
        const content = `I'm not able to process your request : ${JSON.stringify(req)}`;
        if (req.stream) {
            await opts?.stream?.onData({
                choices: [
                    {
                        delta: {
                            content,
                        },
                        finish_reason: 'stop',
                    },
                ],
            });
            await opts?.stream?.onDone();
            return { choices: [] };
        }
        return {
            choices: [
                {
                    finish_reason: 'stop',
                    message: {
                        content,
                    },
                },
            ],
        };
    }
};
FakeLLMManager = __decorate([
    injectable()
], FakeLLMManager);
export { FakeLLMManager };
