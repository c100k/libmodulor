/*
    All this code has been auto generated.
    DO NOT EDIT.
    Or be prepared to see all your changes erased at the next generation.
*/

import { join } from 'node:path';

import {
    assert,
    type Arbitrary,
    type AsyncCommand,
    type ModelRunSetup,
    anything,
    asyncModelRun,
    asyncProperty,
    commands,
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
import { afterAll, afterEach, describe, expect, test } from 'vitest';

import { Configurator } from './Configurator.js';

const appPath = join(import.meta.dirname, '..');
const configurator = new Configurator();
const runner = await newNodeAppTester(14000, 0, {
    appPath,
    configurator,
    srcImporter: (path) => import(path),
});
const ctx = runner.getCtx();
const logger = ctx.container.get<Logger>('Logger');

afterAll(async () => {
    await runner.finalize();
});

test('Sources should be valid', async () => {
    await runner.checkUCDSources();
});

test('Manifest should be valid', async () => {
    await runner.checkAppManifest();
});

test('I18n should be valid', async () => {
    await runner.checkAppI18n();
});

test('index should be valid', async () => {
    await runner.checkAppIndex();
});

const flows = await configurator.flows();
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

const { ucdRefs } = ctx;
describe.runIf(ucdRefs.length > 0)('Use Cases', () => {
    describe.each(ucdRefs)('$name', async (ucdRef) => {
        afterEach(async () => {
            await configurator.clearExecution(ctx);
        });

        // biome-ignore lint/suspicious/noExplicitAny: can be anything
        let ucd: UCDef<any, any, any>;

        test('should be valid', async () => {
            ucd = await runner.checkUC(ucdRef);
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
                        `hash = ${hash}`,
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
                    const out = await runner.execMonkeyTest(ucd, this.input);

                    if (out.err !== null) {
                        if (!(out.err instanceof CustomError)) {
                            logger.error(out.err);
                        }
                        expect(out.err).toBeInstanceOf(CustomError);
                    }
                }

                public toString(): string {
                    return `${ucd.metadata.name}(${JSON.stringify(this.input)})`;
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
            const cmdArbs = record(inputLike, { withDeletedKeys: true }).map(
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
        }, 20000);
    });
});
