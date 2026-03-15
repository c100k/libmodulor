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
import { NotImplementedError } from '../../error/index.js';
import { assertCan, } from '../data-store.js';
function predicate(key, filter) {
    if (filter === null) {
        return (r) => r[key] === null;
    }
    if (Array.isArray(filter)) {
        return (r) => r[key] !== null && filter.includes(r[key]);
    }
    return (r) => r[key] === filter;
}
let InMemoryUCDataStore = class InMemoryUCDataStore {
    settingsManager;
    // biome-ignore lint/suspicious/noExplicitAny: can be anything
    entries;
    tx;
    constructor(settingsManager) {
        this.settingsManager = settingsManager;
        this.entries = [];
    }
    s() {
        return {
            uc_data_store_mode: this.settingsManager.get()('uc_data_store_mode'),
        };
    }
    async clear() {
        this.entries = [];
    }
    async destroy() {
        this.entries = [];
    }
    async exists() {
        return this.entries.length > 0;
    }
    async init() {
        // Nothing to do
    }
    initSync() {
        // Nothing to do
    }
    async read(opts) {
        assertCan('read', this.s().uc_data_store_mode);
        let items = this
            .entries;
        // Filter
        // Of course it handles only simple cases (eq X, is null, in) with the AND operator
        if (opts?.filters) {
            const { aggregateId, appName, name, organizationId, userId } = opts.filters;
            if (aggregateId !== undefined) {
                items = items.filter(predicate('aggregateId', aggregateId));
            }
            if (appName !== undefined) {
                items = items.filter(predicate('appName', appName));
            }
            if (name !== undefined) {
                items = items.filter(predicate('name', name));
            }
            if (organizationId !== undefined) {
                items = items.filter(predicate('organizationId', organizationId));
            }
            if (userId !== undefined) {
                items = items.filter(predicate('userId', userId));
            }
        }
        // Sort
        // => No need, we are processing them by order of insertion in the Map
        return {
            records: items,
        };
    }
    async readProjection() {
        assertCan('read', this.s().uc_data_store_mode);
        return [];
    }
    async startTx() {
        this.tx = 'pending';
        return {
            commit: async () => {
                this.tx = 'committed';
            },
            rollback: async () => {
                this.tx = 'rollbacked';
                this.entries = [];
            },
        };
    }
    supportedSpecificBindings() {
        return [];
    }
    async testKey() {
        // Nothing to do
    }
    async write(record) {
        this.writeBulk([record]);
    }
    async writeBulk(records) {
        assertCan('write', this.s().uc_data_store_mode);
        this.entries.push(...records);
    }
    async writeProjection() {
        assertCan('write', this.s().uc_data_store_mode);
        throw new NotImplementedError('writeProjection');
    }
};
InMemoryUCDataStore = __decorate([
    injectable(),
    __param(0, inject('SettingsManager')),
    __metadata("design:paramtypes", [Object])
], InMemoryUCDataStore);
export { InMemoryUCDataStore };
