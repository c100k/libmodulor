import { injectable } from 'inversify';
import type {
    LLMManager,
    LLMManagerSendReq,
    LLMManagerSendRes,
} from 'libmodulor';

@injectable()
export class FakeLLMManager implements LLMManager {
    public async send(req: LLMManagerSendReq): Promise<LLMManagerSendRes> {
        return {
            choices: [
                {
                    finish_reason: 'stop',
                    message: {
                        content: `I'm not able to process your request : ${JSON.stringify(req)}`,
                    },
                },
            ],
        };
    }
}
