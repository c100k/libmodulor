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
var UCDataStoreTester_1;
import { inject, injectable } from 'inversify';
import { APP_NAME_PLACEHOLDER } from '../convention.js';
import { TAmount, TCompanyName, } from '../dt/index.js';
import { UCExecMode, } from '../uc/index.js';
const ERR_SHOULD_NOT_EXIST_AFTER_DESTROY = 'It should not exist after destroy';
const ERR_SHOULD_EXIST_AFTER_INSTALL = 'It should exist after install';
const ERR_SHOULD_RETURN_X_RECORDS = (n) => `It should return ${n} record(s)`;
/**
 * Test that a {@link UCDataStore} conforms to the spec
 *
 * By default it runs tests on the projection mechanism.
 * Therefore, you need to create one in your implementation when creating your test suite.
 * See `src/uc/impl/KnexUCDataStore.test.ts` for an example.
 *
 * Otherwise you can just `skipProjectionTesting`, although it's not recommended.
 */
let UCDataStoreTester = class UCDataStoreTester {
    static { UCDataStoreTester_1 = this; }
    clockManager;
    cryptoManager;
    static PROJECTION_NAME_1 = 'companies';
    ucDataStore;
    skipProjectionTesting = false;
    entries;
    exists;
    filtersTestData;
    readRes;
    constructor(clockManager, cryptoManager) {
        this.clockManager = clockManager;
        this.cryptoManager = cryptoManager;
        this.entries = this.buildEntries();
        this.exists = false;
        this.filtersTestData = this.buildFiltersTestData();
    }
    async exec({ ucDataStore }) {
        this.ucDataStore = ucDataStore;
        await ucDataStore.destroy();
        this.exists = await ucDataStore.exists();
        if (this.exists) {
            throw new Error(ERR_SHOULD_NOT_EXIST_AFTER_DESTROY);
        }
        await ucDataStore.install();
        this.exists = await ucDataStore.exists();
        if (!this.exists) {
            throw new Error(ERR_SHOULD_EXIST_AFTER_INSTALL);
        }
        this.readRes = await ucDataStore.read();
        this.expectXRecords(0);
        await this.insertEntries();
        this.readRes = await ucDataStore.read();
        this.expectXRecords(4);
        for await (const [filters, expectedRecords] of this.filtersTestData) {
            this.readRes = await ucDataStore.read({ filters });
            this.expectXRecords(expectedRecords);
        }
        await ucDataStore.clear();
        this.readRes = await ucDataStore.read();
        this.expectXRecords(0);
        // Write a last one in case need to watch data in the DB
        await this.ucDataStore.write({
            aggregateId: this.cryptoManager.randomUUID(),
            appName: APP_NAME_PLACEHOLDER,
            createdAt: new Date(),
            data: null,
            executionMode: UCExecMode.USER,
            id: this.cryptoManager.randomUUID(),
            input: this.buildUCInput(),
            name: 'CreateX',
            organizationId: null,
            userId: this.cryptoManager.randomUUID(),
        });
        if (this.skipProjectionTesting) {
            return;
        }
        const supportsTsvector = this.ucDataStore
            .supportedSpecificBindings()
            .includes('to_tsvector(?)');
        const tags = ['advertising', 'cloud', "don't be evil"];
        await this.ucDataStore.writeProjection(UCDataStoreTester_1.PROJECTION_NAME_1, {
            id: this.cryptoManager.randomUUID(),
            name: new TCompanyName().example(),
            tags: supportsTsvector ? tags : JSON.stringify(tags),
            turnover: new TAmount('EUR').example(),
        }, { specificBindings: { tags: 'to_tsvector(?)' } });
        await this.ucDataStore.readProjection(UCDataStoreTester_1.PROJECTION_NAME_1);
    }
    setSkipProjectionTesting(skipProjectionTesting) {
        this.skipProjectionTesting = skipProjectionTesting;
    }
    buildEntries() {
        return [
            [
                this.cryptoManager.randomUUID(),
                APP_NAME_PLACEHOLDER,
                ['CreateX', 'DeleteX'],
                this.cryptoManager.randomUUID(),
                this.cryptoManager.randomUUID(),
            ],
            [
                this.cryptoManager.randomUUID(),
                APP_NAME_PLACEHOLDER,
                ['CreateX'],
                null,
                null,
            ],
            [
                this.cryptoManager.randomUUID(),
                APP_NAME_PLACEHOLDER,
                ['CreateX'],
                null,
                null,
            ],
        ];
    }
    buildFiltersTestData() {
        // biome-ignore lint/style/noNonNullAssertion: we're in a test
        const entry = this.entries[0];
        const [aggregateId, appName, ucNames, organizationId, userId] = entry;
        // biome-ignore lint/style/noNonNullAssertion: we're in a test
        const name = ucNames[0];
        // TODO : Enhance these with a combination of filters
        return [
            [{ aggregateId }, 2],
            [{ aggregateId: [aggregateId] }, 2],
            [{ appName }, 4],
            [{ appName: [appName] }, 4],
            [{ name }, 3],
            [{ name: [name] }, 3],
            [{ organizationId: this.cryptoManager.randomUUID() }, 0],
            [{ organizationId }, 2],
            [{ organizationId: [organizationId] }, 2],
            [{ userId: this.cryptoManager.randomUUID() }, 0],
            [{ userId }, 2],
            [{ userId: [userId] }, 2],
            [
                {
                    idWithinInput: {
                        externalId: this.cryptoManager.randomUUID(),
                    },
                },
                0,
            ],
        ];
    }
    buildUCInput() {
        return {
            array: [12, 34],
            boolean: true,
            externalId: this.cryptoManager.randomUUID(),
            float: 12.34,
            int: 12,
            object: {
                boolean: true,
                float: 12.34,
                int: 12,
                string: 'string',
            },
            string: 'string',
        };
    }
    expectXRecords(n) {
        if (this.readRes?.records.length !== n) {
            throw new Error(ERR_SHOULD_RETURN_X_RECORDS(n));
        }
    }
    async insertEntries() {
        for await (const [i, [aggregateId, appName, ucNames, organizationId, userId],] of this.entries.entries()) {
            for await (const [j, ucName] of ucNames.entries()) {
                const createdAt = this.clockManager.time() + (i + 1) * (j + 1);
                await this.ucDataStore.write({
                    aggregateId,
                    appName,
                    createdAt: new Date(createdAt),
                    data: null,
                    executionMode: UCExecMode.USER,
                    id: this.cryptoManager.randomUUID(),
                    input: this.buildUCInput(),
                    name: ucName,
                    organizationId,
                    userId,
                });
            }
        }
    }
};
UCDataStoreTester = UCDataStoreTester_1 = __decorate([
    injectable(),
    __param(0, inject('ClockManager')),
    __param(1, inject('CryptoManager')),
    __metadata("design:paramtypes", [Object, Object])
], UCDataStoreTester);
export { UCDataStoreTester };
