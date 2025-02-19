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
import knex, {} from 'knex';
const FILTERS_MAPPING = new Map([
    ['aggregateId', 'aggregate_id'],
    ['appName', 'app_name'],
    ['name', 'name'],
    ['organizationId', 'organization_id'],
    ['userId', 'user_id'],
]);
let KnexUCDataStore = class KnexUCDataStore {
    settingsManager;
    config;
    client;
    constructor(settingsManager) {
        this.settingsManager = settingsManager;
        this.config = {};
        this.fillConfig();
        this.client = knex(this.config);
    }
    s() {
        return {
            knex_uc_data_store_conn_string: this.settingsManager.get()('knex_uc_data_store_conn_string'),
            knex_uc_data_store_file_path: this.settingsManager.get()('knex_uc_data_store_file_path'),
            knex_uc_data_store_pool_max: this.settingsManager.get()('knex_uc_data_store_pool_max'),
            knex_uc_data_store_pool_min: this.settingsManager.get()('knex_uc_data_store_pool_min'),
            knex_uc_data_store_type: this.settingsManager.get()('knex_uc_data_store_type'),
            uc_data_store_ucs_dataset_name: this.settingsManager.get()('uc_data_store_ucs_dataset_name'),
        };
    }
    async clear() {
        await this.client
            .table(this.s().uc_data_store_ucs_dataset_name)
            .truncate();
    }
    async destroy() {
        await this.client.schema.dropTableIfExists(this.s().uc_data_store_ucs_dataset_name);
    }
    async exists() {
        return this.client.schema.hasTable(this.s().uc_data_store_ucs_dataset_name);
    }
    async initTx() {
        return this.client.transaction();
    }
    async install() {
        await this.migration001CreateMainTable();
    }
    async read(opts) {
        const query = this.client(this.s().uc_data_store_ucs_dataset_name);
        // Filter
        if (opts?.filters) {
            const { aggregateId, appName, idWithinInput, name, organizationId, userId, } = opts.filters;
            this.filter(query, aggregateId, 'aggregateId');
            this.filter(query, appName, 'appName');
            this.filter(query, name, 'name');
            this.filter(query, organizationId, 'organizationId');
            this.filter(query, userId, 'userId');
            if (idWithinInput !== undefined) {
                for (const [k, v] of Object.entries(idWithinInput)) {
                    // Not comfortable with the key here but it seems to escape correctly :
                    // select * from "d2efe54a-ce85-437c-958e-440f54c0743d"
                    //   where jsonb_path_query_first("input", ?) #>> '{}' = ?
                    //   and "name" = ?
                    //   and "organization_id" = ?
                    //   order by "created_at" asc
                    query.whereJsonPath('input', `$.${k}`, '=', v);
                }
            }
        }
        // Sort
        query.orderBy('created_at', 'asc');
        const records = (await query).map((r) => this.mapRowToRecord(r));
        return {
            records,
        };
    }
    async readProjection(name, opts) {
        const query = this.client(name);
        // Sort
        if (opts?.orderBy) {
            for (const [k, v] of Object.entries(opts.orderBy)) {
                query.orderBy(k, v);
            }
        }
        // Paginate
        if (opts?.limit) {
            query.limit(opts.limit);
        }
        const records = await query;
        return records;
    }
    supportedSpecificBindings() {
        const type = this.s().knex_uc_data_store_type;
        switch (type) {
            case 'pg':
                return ['to_tsvector(?)'];
            case 'sqlite3':
                return [];
            default:
                ((_) => { })(type);
                return [];
        }
    }
    async testKey(_encryptionKey) {
        throw new Error('Not available for this implementation.');
    }
    async write(record, opts) {
        await this.writeBulk([record], opts);
    }
    async writeBulk(records, opts) {
        const query = this.client(this.s().uc_data_store_ucs_dataset_name).insert(records.map((r) => this.mapRecordToRow(r)));
        if (opts?.tx) {
            query.transacting(opts.tx.ref);
        }
        await query;
    }
    async writeProjection(name, data, opts) {
        const dataToInsert = {};
        for (const [k, v] of Object.entries(data)) {
            const specificBinding = opts?.specificBindings?.[k];
            dataToInsert[k] =
                specificBinding &&
                    this.supportedSpecificBindings().includes(specificBinding)
                    ? this.client.raw(specificBinding, [v])
                    : v;
        }
        const query = this.client(name).insert(dataToInsert);
        if (opts?.tx) {
            query.transacting(opts.tx.ref);
        }
        await query;
    }
    fillConfig() {
        const type = this.s().knex_uc_data_store_type;
        this.config.client = type;
        switch (type) {
            case 'pg':
                this.fillConfigForPG();
                break;
            case 'sqlite3':
                this.fillConfigForSQLite3();
                break;
            default:
                ((_) => { })(type);
        }
    }
    fillConfigForPG() {
        this.config.connection = {
            connectionString: this.s().knex_uc_data_store_conn_string,
        };
        this.config.pool = {
            max: this.s().knex_uc_data_store_pool_max,
            min: this.s().knex_uc_data_store_pool_min,
        };
    }
    fillConfigForSQLite3() {
        this.config.useNullAsDefault = true;
        this.config.connection = {
            filename: this.s().knex_uc_data_store_file_path,
        };
    }
    filter(query, value, field) {
        if (value === undefined) {
            return;
        }
        const col = FILTERS_MAPPING.get(field);
        if (!col) {
            return;
        }
        Array.isArray(value)
            ? query.whereIn(col, value)
            : query.where(col, value);
    }
    mapRecordToRow(record) {
        return {
            aggregate_id: record.aggregateId,
            app_name: record.appName,
            created_at: record.createdAt,
            data: record.data,
            execution_mode: record.executionMode,
            id: record.id,
            input: record.input,
            name: record.name,
            organization_id: record.organizationId,
            user_id: record.userId,
        };
    }
    mapRowToRecord(row) {
        return {
            aggregateId: row.aggregate_id,
            appName: row.app_name,
            createdAt: row.created_at,
            data: this.parseJSONColIfNecessary(row.data),
            executionMode: row.execution_mode,
            id: row.id,
            input: this.parseJSONColIfNecessary(row.input),
            name: row.name,
            organizationId: row.organization_id,
            userId: row.user_id,
        };
    }
    parseJSONColIfNecessary(value) {
        // In some DBs, the json type is returned as string (e.g. sqlite3)
        return typeof value === 'string' ? JSON.parse(value) : value;
    }
    //#region migrations
    async migration001CreateMainTable() {
        // Using hasTable and then createTable because createTableIfNotExists has been deprecated
        // See https://github.com/knex/knex/issues/1303#issuecomment-594489136
        const exists = await this.client.schema.hasTable(this.s().uc_data_store_ucs_dataset_name);
        if (exists) {
            return;
        }
        await this.client.schema.createTable(this.s().uc_data_store_ucs_dataset_name, (table) => {
            table.uuid('aggregate_id').notNullable();
            table.string('app_name').notNullable();
            table
                .dateTime('created_at')
                .notNullable()
                .defaultTo(this.client.fn.now());
            table.jsonb('data');
            table.string('execution_mode').notNullable();
            table.uuid('id').notNullable().primary();
            table.jsonb('input');
            table.string('name').notNullable();
            table.uuid('organization_id');
            table.uuid('user_id');
            table.index('aggregate_id');
            table.index('name');
            table.index('organization_id');
            table.index('user_id');
        });
    }
};
KnexUCDataStore = __decorate([
    injectable(),
    __param(0, inject('SettingsManager')),
    __metadata("design:paramtypes", [Object])
], KnexUCDataStore);
export { KnexUCDataStore };
