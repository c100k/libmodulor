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
import { NotAvailableError, NotImplementedError } from '../../error/index.js';
export const ROW_COLS = [
    'aggregateId',
    'appName',
    'createdAt',
    'data',
    'executionMode',
    'id',
    'input',
    'name',
    'organizationId',
    'userId',
];
/**
 * @alpha This implementation is still a WIP and needs improvement
 */
let CloudflareD1UCDataStore = class CloudflareD1UCDataStore {
    settingsManager;
    // Defined as protected and not private so the `assertClient` guard works correctly
    // See https://stackoverflow.com/a/74267363/1259118
    // > Such property type guards only work when the property you are narrowing is not private; if the property is private then this gets narrowed to never because an object with a private property is not assignable to an object with a public property of the same key.
    client;
    constructor(settingsManager) {
        this.settingsManager = settingsManager;
    }
    s() {
        return {
            uc_data_store_ucs_dataset_name: this.settingsManager.get()('uc_data_store_ucs_dataset_name'),
        };
    }
    async clear() {
        throw new NotImplementedError('clear');
    }
    async destroy() {
        throw new NotImplementedError('destroy');
    }
    async exists() {
        throw new NotImplementedError('exists');
    }
    async init() {
        throw new NotAvailableError('initSync');
        // Since workers do not accept top-level await, we cannot invoke this method when initiating it.
        // Plus, calling it in every request handler would be overkill and would add too much overhead.
        // In the meantime, process as follows :
        /*
            mkdir path_to_target/migrations

            cat > path_to_target/migrations/001_init.sql <<'EOF'
-- Table Definition
CREATE TABLE IF NOT EXISTS uc_executions (
    "aggregateId" uuid NOT NULL,
    "appName" varchar(255) NOT NULL,
    "createdAt" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data" jsonb,
    "executionMode" varchar(255) NOT NULL,
    "id" uuid NOT NULL,
    "input" jsonb,
    "name" varchar(255) NOT NULL,
    "organizationId" uuid,
    "userId" uuid,
    PRIMARY KEY ("id")
);

-- Indices
CREATE INDEX IF NOT EXISTS uc_executions_aggregate_id_index ON uc_executions (aggregateId);
CREATE INDEX IF NOT EXISTS uc_executions_name_index ON uc_executions (name);
CREATE INDEX IF NOT EXISTS uc_executions_organization_id_index ON uc_executions (organizationId);
CREATE INDEX IF NOT EXISTS uc_executions_user_id_index ON uc_executions (userId);
            EOF

            pnpm wrangler d1 create my-app-uc-data-store
            pnpm wrangler d1 execute my-app-uc-data-store --cwd path_to_target --local --file=./migrations/001_init.sql
            pnpm wrangler d1 execute my-app-uc-data-store --cwd path_to_target --remote --file=./migrations/001_init.sql
            pnpm wrangler d1 list
        */
    }
    initSync() {
        throw new NotAvailableError('initSync');
    }
    async read(opts) {
        this.assertClient();
        // TODO : Consider using a query builder (or Google's pipe operator ?) when it gets too complicated or dangerous
        const query = [
            `select * from ${this.s().uc_data_store_ucs_dataset_name}`,
        ];
        // Filter
        const where = [];
        const bindings = [];
        if (opts?.filters) {
            const { aggregateId, appName, idWithinInput, name, organizationId, userId, } = opts.filters;
            this.filter(where, bindings, aggregateId, 'aggregateId');
            this.filter(where, bindings, appName, 'appName');
            this.filter(where, bindings, name, 'name');
            this.filter(where, bindings, organizationId, 'organizationId');
            this.filter(where, bindings, userId, 'userId');
            if (idWithinInput !== undefined) {
                // TODO : Implement CloudflareD1UCDataStore.read.opts.filters.idWithinInput
                throw new Error('opts.filters.idWithinInput is not supported yet');
            }
        }
        if (where.length > 0) {
            query.push('where', where.join(' and '));
        }
        // Sort
        query.push('order by createdAt asc');
        const sql = query.join(' ');
        const { results } = await this.client
            .prepare(sql)
            .bind(...bindings)
            .run();
        const records = results.map((r) => ({
            ...r,
            data: JSON.parse(r.data),
            input: JSON.parse(r.input),
        }));
        return {
            records,
        };
    }
    async readProjection(_name, _opts) {
        throw new NotImplementedError('readProjection');
    }
    async startTx() {
        throw new NotImplementedError('startTx');
    }
    supportedSpecificBindings() {
        throw new NotImplementedError('supportedSpecificBindings');
    }
    async testKey(_encryptionKey) {
        throw new NotAvailableError('testKey');
    }
    async write(record, _opts) {
        this.assertClient();
        const cols = ROW_COLS.join(', ');
        const placeholders = ROW_COLS.map(() => '?').join(', ');
        // Use variables only for variables declared here => never for data coming from outside this method !
        const query = `insert into ${this.s().uc_data_store_ucs_dataset_name} (${cols}) values (${placeholders})`;
        const values = ROW_COLS.map((c) => {
            const val = record[c];
            if (val instanceof Date) {
                // D1_TYPE_ERROR: Type 'object' not supported for value 'Wed Jun 18 2025 13:32:27 GMT+0200 (Central European Summer Time)
                return val.toISOString();
            }
            if (val !== null && typeof val === 'object') {
                // D1_TYPE_ERROR: Type 'object' not supported for value '[object Object]'
                return JSON.stringify(val);
            }
            return val;
        });
        await this.client
            .prepare(query)
            .bind(...values)
            .run();
    }
    async writeBulk(_records, _opts) {
        throw new NotImplementedError('writeBulk');
    }
    async writeProjection(_name, _data, _opts) {
        throw new NotImplementedError('writeProjection');
    }
    setClient(client) {
        this.client = client;
    }
    assertClient() {
        if (this.client === undefined) {
            throw new Error('You must call UCDataStore#setClient with the D1Database from the context (e.g. hono context)');
        }
    }
    filter(query, bindings, value, field) {
        if (value === undefined) {
            return;
        }
        if (Array.isArray(value)) {
            query.push(`${field} in (${value.map(() => '?')})`);
            bindings.push(...value);
        }
        else {
            query.push(`${field} = ?`);
            bindings.push(value);
        }
    }
};
CloudflareD1UCDataStore = __decorate([
    injectable(),
    __param(0, inject('SettingsManager')),
    __metadata("design:paramtypes", [Object])
], CloudflareD1UCDataStore);
export { CloudflareD1UCDataStore };
