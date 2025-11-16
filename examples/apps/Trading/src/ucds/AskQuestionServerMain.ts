import { inject, injectable } from 'inversify';

import {
    buildSingleItemOutput,
    type CryptoManager,
    type LLMManager,
    type UCMain,
    type UCMainInput,
    type UCManager,
    type UCOutput,
    UCOutputBuilder,
} from '../../../../../dist/esm/index.js';
import type {
    AskQuestionData,
    AskQuestionInput,
    AskQuestionOPI0,
} from './AskQuestionUCD.js';

const SYSTEM_PROMPT =
    'You are an expert in stock investment. Only reply to questions asking you to recommend stocks to buy';

@injectable()
export class AskQuestionServerMain
    implements UCMain<AskQuestionInput, AskQuestionOPI0>
{
    constructor(
        @inject('CryptoManager') private cryptoManager: CryptoManager,
        @inject('LLMManager') private llmManager: LLMManager,
        @inject('UCManager') private ucManager: UCManager,
    ) {}

    public async exec({
        opts,
        uc,
    }: UCMainInput<AskQuestionInput, AskQuestionOPI0>): Promise<
        UCOutput<AskQuestionOPI0>
    > {
        const prompt = uc.reqVal0('prompt');

        const transportType = uc.def.ext?.http?.transportType ?? 'standard';

        // We don't destructure `choices` because it can be undefined if `stream` is `true`.
        let fullRes = '';
        if (opts?.stream) {
            opts.stream.onClose = async () => {};
        }
        const response = await this.llmManager.send(
            {
                messages: [
                    {
                        content: SYSTEM_PROMPT,
                        role: 'system',
                    },
                    {
                        content: prompt,
                        role: 'user',
                    },
                ],
                model: 'mistral-large-latest',
                stream: transportType === 'stream',
            },
            {
                stream: {
                    onClose: async () => opts?.stream?.onClose(),
                    onData: async (chunk) => {
                        const choice = chunk.choices[0];
                        const res = choice?.delta?.content ?? '';
                        fullRes += res;
                        opts?.stream?.onData?.(
                            buildSingleItemOutput({
                                id: this.cryptoManager.randomUUID(),
                                res,
                            }),
                        );
                    },
                    onDone: async () => {
                        await opts?.stream?.onDone();
                        await this.ucManager.persist<
                            AskQuestionInput,
                            AskQuestionData,
                            AskQuestionOPI0
                        >(uc, { res: fullRes });
                    },
                },
            },
        );

        let res = '';
        switch (transportType) {
            case 'standard':
                res = response.choices[0]?.message?.content ?? '';
                break;
            case 'stream':
                res = '<streamed>';
                break;
            default:
                transportType satisfies never;
        }

        return new UCOutputBuilder<AskQuestionOPI0>()
            .add({
                id: this.cryptoManager.randomUUID(),
                res,
            })
            .get();
    }
}
