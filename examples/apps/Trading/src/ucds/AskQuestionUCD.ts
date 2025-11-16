import {
    AuthenticatedUCPolicy,
    type FreeTextLong,
    SendClientMain,
    TFreeTextLong,
    type UCData,
    type UCDef,
    type UCInput,
    type UCInputFieldValue,
    type UCOPIBase,
} from '../../../../../dist/esm/index.js';
import { Manifest } from '../manifest.js';
import { AskQuestionServerMain } from './AskQuestionServerMain.js';

export interface AskQuestionData extends UCData {
    res: FreeTextLong;
}

export interface AskQuestionInput extends UCInput {
    prompt: UCInputFieldValue<FreeTextLong>;
}

export interface AskQuestionOPI0 extends UCOPIBase {
    res: FreeTextLong;
}

export const AskQuestionUCD: UCDef<AskQuestionInput, AskQuestionOPI0> = {
    ext: {
        http: {
            transportType: 'stream',
        },
    },
    io: {
        i: {
            fields: {
                prompt: {
                    type: new TFreeTextLong().setExamples([
                        'What stock to buy ?',
                    ]),
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
            main: SendClientMain,
            policy: AuthenticatedUCPolicy,
        },
        server: {
            main: AskQuestionServerMain,
            policy: AuthenticatedUCPolicy,
        },
    },
    metadata: Manifest.ucReg.AskQuestion,
};
