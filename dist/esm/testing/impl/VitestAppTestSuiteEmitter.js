var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { inject, injectable } from 'inversify';
import { APP_I18N_NAME, APP_INDEX_NAME, APP_MANIFEST_NAME, APP_TEST_CONFIGURATOR_FILE_NAME, APP_TEST_CONFIGURATOR_NAME, APP_TEST_DIR_NAME, APP_TEST_MAIN_FILE_NAME, } from '../../convention.js';
let VitestAppTestSuiteEmitter = class VitestAppTestSuiteEmitter {
    fsManager;
    constructor(fsManager) {
        this.fsManager = fsManager;
    }
    async exec({ appPath, depsMapping, idx, monkeyTestingTimeoutInMs, serverPortRangeStart, }) {
        const testPath = this.fsManager.path(appPath, APP_TEST_DIR_NAME);
        // Since we're using 'recursive: true', there will be no error if the directory already exists
        await this.fsManager.mkdir(testPath, { recursive: true });
        await this.createConfiguratorIfNotExists(testPath, depsMapping);
        const testFilePath = this.fsManager.path(testPath, APP_TEST_MAIN_FILE_NAME);
        const tpl = this.mapDeps(depsMapping, template(serverPortRangeStart, idx, monkeyTestingTimeoutInMs));
        await this.fsManager.touch(testFilePath, tpl);
        return {
            outPath: testFilePath,
        };
    }
    async createConfiguratorIfNotExists(testPath, depsMapping) {
        const filePath = this.fsManager.path(testPath, APP_TEST_CONFIGURATOR_FILE_NAME);
        if (await this.fsManager.exists(filePath)) {
            return;
        }
        const tpl = this.mapDeps(depsMapping, CONFIGURATOR_TS);
        await this.fsManager.touch(filePath, tpl);
    }
    mapDeps(depsMapping, tpl) {
        let res = tpl;
        depsMapping?.forEach((to, from) => {
            res = res.replaceAll(`from '${from}'`, `from '${to}'`);
        });
        return res;
    }
};
VitestAppTestSuiteEmitter = __decorate([
    injectable(),
    __param(0, inject('FSManager')),
    __metadata("design:paramtypes", [Object])
], VitestAppTestSuiteEmitter);
export { VitestAppTestSuiteEmitter };
const CONFIGURATOR_TS = `import { NodeAppTesterConfigurator } from 'libmodulor/node-test';

export class ${APP_TEST_CONFIGURATOR_NAME} extends NodeAppTesterConfigurator {}
`;
// For now, we can have it here. When it becomes harder to maintain, we can introduce some kind of template engine.
// Be aware that this will introduce complexities on building the lib.
// We'll need to include these templates in the build and make them accessible via package.json "exports" or any other mechanism.
// Hence the choice to keep it simple for now.
// Defined it as function in case we need to pass args.
const template = (serverPortRangeStart, idx, monkeyTestingTimeoutInMs) => `/*
    All this code has been auto generated.
    DO NOT EDIT.
    Or be prepared to see all your changes erased at the next generation.
*/

import { join } from 'node:path';

import {
    type Arbitrary,
    type AsyncCommand,
    anything,
    assert,
    asyncModelRun,
    asyncProperty,
    commands,
    type ModelRunSetup,
    record,
} from 'fast-check';
import {
    CustomError,
    type Logger,
    type UCAuthSetterName,
    type UCDef,
    type UCInput,
} from 'libmodulor';
import { newNodeAppTester } from 'libmodulor/node-test';
import { afterAll, afterEach, beforeAll, describe, expect, test } from 'vitest';

import { ${APP_TEST_CONFIGURATOR_NAME} } from './${APP_TEST_CONFIGURATOR_NAME}.js';

const appPath = join(import.meta.dirname, '..');
const configurator = new ${APP_TEST_CONFIGURATOR_NAME}();
const runner = await newNodeAppTester(${serverPortRangeStart}, ${idx}, {
    appPath,
    configurator,
    srcImporter: (path) => import(path),
});
const ctx = runner.getCtx();
const logger = ctx.container.get<Logger>('Logger');

const flows = await configurator.flows();

afterAll(async () => {
    await runner.finalize();
});

describe('Check', () => {
    test('Sources should be valid', async () => {
        await runner.checkUCDSources();
    });

    test('Folder should be valid', async () => {
        await runner.checkAppFolder();
    });

    test('${APP_MANIFEST_NAME} should be valid', async () => {
        await runner.checkAppManifest();
    });

    test('${APP_I18N_NAME} should be valid', async () => {
        await runner.checkAppI18n();
    });

    test('${APP_INDEX_NAME} should be valid', async () => {
        await runner.checkAppIndex();
    });

    describe.runIf(ctx.ucdRefs.length > 0)('Use Cases', () => {
        describe.each(ctx.ucdRefs)('$name', async (ucdRef) => {
            test('should be valid', async () => {
                await runner.checkUC(ucdRef);
            });
        });
    });
});

describe('Run', async () => {
    beforeAll(async () => {
        await runner.initForUCExec();
    });

    describe.runIf(flows.length > 0)('Flows', async () => {
        afterEach(async () => {
            await configurator.clearExecution(ctx);
        });

        test.each(flows)('should execute flow $name', async (flow) => {
            const output = await runner.execFlow(flow);

            for (const out of output) {
                if (out.err !== null) {
                    if (!(out.err instanceof CustomError)) {
                        logger.error(out.err);
                    }
                    expect(out.err).toBeInstanceOf(CustomError);
                }
            }
        });
    });

    describe.runIf(ctx.ucdRefs.length > 0)('Use Cases', () => {
        describe.each(ctx.ucdRefs)('$name', async (ucdRef) => {
            afterEach(async () => {
                await configurator.clearExecution(ctx);
            });

            // biome-ignore lint/suspicious/noExplicitAny: can be anything
            let ucd: UCDef<any, any, any>;

            beforeAll(() => {
                // biome-ignore lint/suspicious/noExplicitAny: can be anything
                ucd = runner.getUCD<any, any, any>(ucdRef.name);
            });

            const data = await runner.ucTestData(ucdRef);

            test.each(data)(
                'should execute with auth $authName and input $inputFillerName',
                async ({ auth, authName, inputFiller, inputFillerName }) => {
                    const { out, sideEffects } = await runner.execUC({
                        auth,
                        authName: authName as UCAuthSetterName,
                        inputFiller,
                        inputFillerName,
                        ucd,
                    });

                    if (out.err !== null) {
                        if (!(out.err instanceof CustomError)) {
                            logger.error(out.err);
                        }
                        expect(out.err).toBeInstanceOf(CustomError);
                    }

                    const { hash } = out;
                    const assertion = hash
                        ? (await configurator.specificAssertions())?.get(hash)
                        : undefined;
                    if (assertion) {
                        expect(out).toSatisfy(assertion);
                    } else {
                        expect({ out, sideEffects }).toMatchSnapshot(
                            \`hash = \${hash}\`,
                        );
                    }
                },
            );

            test('should execute with monkey testing', async () => {
                // Given
                // biome-ignore lint/complexity/noBannedTypes: nothing for now
                type Model = {};
                // biome-ignore lint/complexity/noBannedTypes: nothing for now
                type RealSystem = {};

                class MyCommand<I extends UCInput | undefined = undefined>
                    implements AsyncCommand<Model, RealSystem>
                {
                    constructor(private input: I) {}

                    public check(_m: Readonly<Model>): boolean {
                        return true;
                    }

                    public async run(_m: Model, _r: RealSystem): Promise<void> {
                        const out = await runner.execMonkeyTest(
                            ucd,
                            this.input,
                        );

                        if (out.err !== null) {
                            if (!(out.err instanceof CustomError)) {
                                logger.error(out.err);
                            }
                            expect(out.err).toBeInstanceOf(CustomError);
                        }
                    }

                    public toString(): string {
                        return \`\${ucd.metadata.name}(\${JSON.stringify(this.input)})\`;
                    }
                }

                const inputFields = ucd.io.i?.fields;
                if (!inputFields || Object.keys(inputFields).length > 0) {
                    // Mainly to prevent monkey testing from running indefinitely
                    return;
                }

                // biome-ignore lint/suspicious/noExplicitAny: can be anything
                const inputLike: Record<string, Arbitrary<any>> = {};
                for (const k of Object.keys(inputFields)) {
                    inputLike[k] = anything();
                }
                const cmdArbs = record(inputLike, { requiredKeys: [] }).map(
                    (r) => new MyCommand(r),
                );

                const modelRunSetup: ModelRunSetup<Model, RealSystem> = () => ({
                    model: {},
                    real: {},
                });

                // When
                const property = asyncProperty(commands([cmdArbs]), (cmds) =>
                    asyncModelRun(modelRunSetup, cmds),
                );

                // Then
                await assert(property);
            }, ${monkeyTestingTimeoutInMs});
        });
    });
});
`;
