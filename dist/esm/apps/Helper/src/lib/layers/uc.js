import { APP_MANIFEST_FILE_NAME, APP_MANIFEST_NAME, UC_DEF_FILE_NAME_SUFFIX, UC_DEF_SUFFIX, UC_DEF_TYPE, UC_INPUT_SUFFIX, UC_MAIN_SERVER_FILE_NAME_SUFFIX, UC_MAIN_SERVER_SUFFIX, UC_OPI0_SUFFIX, } from '../../../../../convention.js';
import { LIB_NAME } from '../consts.js';
import { fileImportName } from '../funcs.js';
const TODO = '// TODO : Replace me';
const FIELD_NAME = 'foo';
const UCD_TS = (name) => `import {
    type FreeTextShort,
    NobodyUCPolicy,
    SendClientMain,
    TFreeTextShort,
    type UCDef,
    type UCInput,
    type UCInputFieldValue,
    type UCOPIBase,
} from '${LIB_NAME}';

import { ${APP_MANIFEST_NAME} } from '../${fileImportName(APP_MANIFEST_FILE_NAME)}';
import { ${name}${UC_MAIN_SERVER_SUFFIX} } from './${fileImportName(`${name}${UC_MAIN_SERVER_SUFFIX}`)}';

export interface ${name}${UC_INPUT_SUFFIX} extends UCInput {
    ${TODO}
    ${FIELD_NAME}: UCInputFieldValue<FreeTextShort>;
}

export interface ${name}${UC_OPI0_SUFFIX} extends UCOPIBase {
    ${TODO}
    ${FIELD_NAME}: FreeTextShort;
}

export const ${name}${UC_DEF_SUFFIX}: ${UC_DEF_TYPE}<${name}${UC_INPUT_SUFFIX}, ${name}${UC_OPI0_SUFFIX}> = {
    io: {
        i: {
            fields: {
                ${FIELD_NAME}: {
                    ${TODO}
                    type: new TFreeTextShort(),
                },
            },
        },
        o: {
            parts: {
                _0: {
                    fields: {
                        ${FIELD_NAME}: {
                            ${TODO}
                            type: new TFreeTextShort(),
                        },
                    },
                },
            },
        },
    },
    lifecycle: {
        client: {
            main: SendClientMain,
            policy: NobodyUCPolicy,
        },
        server: {
            main: ${name}${UC_MAIN_SERVER_SUFFIX},
            policy: NobodyUCPolicy,
        },
    },
    metadata: ${APP_MANIFEST_NAME}.ucReg.${name},
};
`;
const SERVER_MAIN_TS = (name) => `import { inject, injectable } from 'inversify';
import {
    type UCMain,
    type UCMainInput,
    type UCManager,
    type UCOutput,
    UCOutputBuilder,
} from '${LIB_NAME}';

import type {
    ${name}${UC_INPUT_SUFFIX},
    ${name}${UC_OPI0_SUFFIX},
} from './${fileImportName(`${name}${UC_DEF_SUFFIX}`)}';

@injectable()
export class ${name}${UC_MAIN_SERVER_SUFFIX}
    implements UCMain<${name}${UC_INPUT_SUFFIX}, ${name}${UC_OPI0_SUFFIX}>
{
    constructor(@inject('UCManager') private ucManager: UCManager) {}

    public async exec({
        uc,
    }: UCMainInput<${name}${UC_INPUT_SUFFIX}, ${name}${UC_OPI0_SUFFIX}>): Promise<
        UCOutput<${name}${UC_OPI0_SUFFIX}>
    > {
        const ${FIELD_NAME} = uc.reqVal0('${FIELD_NAME}');

        // >=> Save in data store
        const { aggregateId } = await this.ucManager.persist(uc);

        return new UCOutputBuilder<${name}${UC_OPI0_SUFFIX}>()
            .add({
                ${FIELD_NAME},
                id: aggregateId,
            })
            .get();
    }
}
`;
export function files(name) {
    return new Map([
        [['.', `${name}${UC_DEF_FILE_NAME_SUFFIX}`], UCD_TS(name)],
        [
            ['.', `${name}${UC_MAIN_SERVER_FILE_NAME_SUFFIX}`],
            SERVER_MAIN_TS(name),
        ],
    ]);
}
