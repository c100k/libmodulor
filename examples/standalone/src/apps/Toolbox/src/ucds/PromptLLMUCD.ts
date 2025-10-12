import { inject, injectable } from 'inversify';
import {
    type ApiKey,
    buildSingleItemOutput,
    type CryptoManager,
    EverybodyUCPolicy,
    type FreeTextLong,
    type LLMManager,
    type Slug,
    TApiKey,
    TFreeTextLong,
    type TransportType,
    TSlug,
    TTransportType,
    type UCDef,
    type UCInput,
    type UCInputFieldValue,
    type UCMain,
    type UCMainInput,
    type UCOPIBase,
    type UCOutput,
    UCOutputBuilder,
} from 'libmodulor';

import { Manifest } from '../manifest.js';

export interface PromptLLMInput extends UCInput {
    apiKey: UCInputFieldValue<ApiKey>;
    modelName: UCInputFieldValue<Slug>;
    prompt: UCInputFieldValue<FreeTextLong>;
    transportType: UCInputFieldValue<TransportType>;
}

export interface PromptLLMOPI0 extends UCOPIBase {
    res: FreeTextLong;
}

@injectable()
class PromptLLMClientMain implements UCMain<PromptLLMInput, PromptLLMOPI0> {
    constructor(
        @inject('CryptoManager') private cryptoManager: CryptoManager,
        @inject('LLMManager') private llmManager: LLMManager,
    ) {}

    public async exec({
        onPartialOutput,
        uc,
    }: UCMainInput<PromptLLMInput, PromptLLMOPI0>): Promise<
        UCOutput<PromptLLMOPI0>
    > {
        const apiKey = uc.reqVal0('apiKey');
        const modelName = uc.reqVal0('modelName');
        const prompt = uc.reqVal0('prompt');
        const transportType = uc.reqVal0('transportType');

        // We don't destructure `choices` because it can be undefined if `stream` is `true`.
        const response = await this.llmManager.send(
            {
                messages: [
                    {
                        content:
                            'Answer only quick questions about Sports in general. Discard any other request.',
                        role: 'system',
                    },
                    {
                        content: prompt,
                        role: 'user',
                    },
                ],
                model: modelName,
                stream: transportType === 'stream',
            },
            {
                auth: {
                    apiKey,
                },
                onPartialOutput: (chunk) => {
                    onPartialOutput?.(
                        buildSingleItemOutput({
                            id: this.cryptoManager.randomUUID(),
                            res: chunk.choices[0]?.delta?.content ?? '',
                        }),
                    );
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
                ((_: never): void => {})(transportType);
        }

        const id = this.cryptoManager.randomUUID();

        return new UCOutputBuilder<PromptLLMOPI0>()
            .add({
                id,
                res,
            })
            .get();
    }
}

const MODELS: Slug[] = [
    'mistral-small-latest',
    'mistral-medium-latest',
    'mistral-large-latest',
];

export const PromptLLMUCD: UCDef<PromptLLMInput, PromptLLMOPI0> = {
    io: {
        i: {
            fields: {
                apiKey: {
                    type: new TApiKey(),
                },
                modelName: {
                    // https://docs.mistral.ai/getting-started/models/models_overview
                    type: new TSlug().setOptions(
                        MODELS.map((m) => ({ label: m, value: m })),
                    ),
                },
                prompt: {
                    type: new TFreeTextLong()
                        .setExamples([
                            'Who won the FIFA World Cup in 1998 and 2018 ?',
                        ])
                        .setInitialValue(
                            'Who won the FIFA World Cup in 1998 and 2018 ?',
                        ),
                },
                transportType: {
                    type: new TTransportType().setInitialValue('standard'),
                },
            },
        },
        o: {
            parts: {
                _0: {
                    fields: {
                        res: {
                            type: new TFreeTextLong(),
                        },
                    },
                },
            },
        },
    },
    lifecycle: {
        client: {
            main: PromptLLMClientMain,
            policy: EverybodyUCPolicy,
        },
    },
    metadata: Manifest.ucReg.PromptLLM,
};
